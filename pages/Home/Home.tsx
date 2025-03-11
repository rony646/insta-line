import { useState } from "react";

import { ToastAndroid } from "react-native";

import { Button, Input } from "@ui-kitten/components";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as Clipboard from "expo-clipboard";

import { data } from "./data";
import * as S from "./styles";

import { generatePostCaption } from "../../services/endpoints";

export const Home = () => {
  const [inputText, setInputText] = useState<string>("");
  const [caption, setCaption] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

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

  return (
    <S.Container>
      <S.Wrapper>
        <Button
          size="large"
          style={{ width: "100%" }}
          accessoryLeft={<Ionicons name="image" size={25} color="#fff" />}
        >
          Upload your post images
        </Button>

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
          {data.button}
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
