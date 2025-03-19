import { useState } from "react";

import * as ImagePicker from "expo-image-picker";
import Carousel from "react-native-reanimated-carousel";

import { Image, ToastAndroid, View } from "react-native";

import { Button, Input } from "@ui-kitten/components";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as Clipboard from "expo-clipboard";

import { data } from "./data";
import * as S from "./styles";
import { Image as ImageType } from "./types";

import { generatePostCaption } from "../../services/endpoints";
import React from "react";

export const Home = () => {
  const [inputText, setInputText] = useState<string>("");
  const [caption, setCaption] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [images, setImages] = useState<ImageType[]>([]);

  const handleGenerateCaption = async (description: string) => {
    setLoading(true);
    const response = await generatePostCaption(description);
    setCaption(response.choices[0].message.content);
    setLoading(false);
  };

  const handleCopyCaptionPress = () => {
    Clipboard.setStringAsync(caption).then(() =>
      ToastAndroid.show(data.messages.copied, ToastAndroid.SHORT)
    );
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

  return (
    <S.Container>
      <S.Wrapper>
        <Button
          size="large"
          style={S.styles.button}
          onPress={pickImage}
          aria-label="Upload your post images"
          accessoryLeft={<Ionicons name="image" size={25} color="#fff" />}
        >
          {data.buttons.uploadImage}
        </Button>

        {images.length && (
          <View>
            <Carousel
              width={350}
              height={160}
              data={images}
              mode="parallax"
              renderItem={({ item }) => (
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Image
                    source={{ uri: item.uri }}
                    style={{ width: 320, height: 170, borderRadius: 10 }}
                  />
                </View>
              )}
            />
          </View>
        )}

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

        <Button
          disabled={!inputText || loading}
          size="large"
          onPress={() => handleGenerateCaption(inputText)}
          style={S.styles.button}
        >
          {data.buttons.caption}
        </Button>

        <S.ResultContainer>
          <S.FlexWrapper>
            <S.CaptionContainer>
              <S.Caption textColor={caption ? "#232323" : "#3c3c3c97"}>
                {caption ? `${caption}` : data.placeholder}
              </S.Caption>
            </S.CaptionContainer>
            {caption && (
              <S.Touchable onPress={handleCopyCaptionPress}>
                <Ionicons name="copy" size={42} color="#3c3c3cdd" />
              </S.Touchable>
            )}
          </S.FlexWrapper>
        </S.ResultContainer>
      </S.Wrapper>
    </S.Container>
  );
};
