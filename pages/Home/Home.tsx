import { useState } from "react";

import { ToastAndroid } from "react-native";

import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import * as Mime from "react-native-mime-types";

import { Button, Input } from "@ui-kitten/components";
import Ionicons from "@expo/vector-icons/Ionicons";

import { data } from "./data";
import { ImageType } from "@/components/Carousel/types";
import * as S from "./styles";

import { generatePostCaption } from "@/services/endpoints";
import React from "react";
import Carousel from "@/components/Carousel";
import ShowCaption from "@/components/ShowCaption";
import { saveCaption } from "@/utils/asyncStorage";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootTabParamList } from "@/navigation/types";

export const Home = () => {
  const [inputText, setInputText] = useState<string>("");
  const [caption, setCaption] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [images, setImages] = useState<ImageType[]>([]);
  const [base64Images, setBase64Images] = useState<string[]>([]);

  const convertImagesToBase64 = async (
    images: ImageType[]
  ): Promise<string[]> => {
    return Promise.all(
      images.map(async (image) => {
        const base64 = await FileSystem.readAsStringAsync(image.uri, {
          encoding: FileSystem.EncodingType.Base64,
        });
        const imageType = Mime.lookup(image.uri) || "image/jpeg";

        return `data:${imageType};base64,${base64}`;
      })
    );
  };

  const handleGenerateCaption = async (description: string) => {
    setLoading(true);
    try {
      const base64Images = await convertImagesToBase64(images);

      const response = await generatePostCaption(description, base64Images);
      const captionText = response.choices[0].message.content;
      setCaption(captionText);

      saveCaption(
        new Date().toISOString(),
        base64Images,
        captionText,
        inputText
      );

      setLoading(false);
    } catch (error) {
      ToastAndroid.show(data.messages.error, ToastAndroid.SHORT);
      setLoading(false);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: false,
      allowsMultipleSelection: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const images: ImageType[] = result.assets.map((asset) => ({
        id: asset.assetId as string,
        uri: asset.uri,
      }));

      setImages(images);
    }
  };

  console.log("images", images);

  return (
    <S.Container>
      <S.Wrapper>
        {base64Images.length ? null : (
          <Button
            size="large"
            style={S.styles.button}
            onPress={pickImage}
            aria-label="Upload your post images"
            accessoryLeft={<Ionicons name="image" size={25} color="#fff" />}
          >
            {data.buttons.uploadImage}
          </Button>
        )}

        {/* {images.length ||
          (base64Images.length && (
            <Carousel
              images={base64Images || images.map((image) => image.uri)}
            />
          ))} */}

        <Input
          value={inputText}
          textStyle={{ height: 100 }}
          multiline
          numberOfLines={10}
          status="info"
          style={S.styles.input}
          placeholder={data.input.placeholder}
          onChangeText={(value) => setInputText(value)}
        />

        {base64Images ? null : (
          <Button
            disabled={!images.length || loading}
            size="large"
            onPress={() => handleGenerateCaption(inputText)}
            style={S.styles.button}
          >
            {data.buttons.caption}
          </Button>
        )}

        <ShowCaption caption={caption} />
      </S.Wrapper>
    </S.Container>
  );
};
