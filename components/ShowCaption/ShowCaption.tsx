import { ToastAndroid } from "react-native";

import * as Clipboard from "expo-clipboard";
import Ionicons from "@expo/vector-icons/Ionicons";

import { data } from "./data";
import * as S from "./styles";

interface ShowCaptionProps {
  caption: string;
}

export const ShowCaption = ({ caption }: ShowCaptionProps) => {
  const handleCopyCaptionPress = () => {
    Clipboard.setStringAsync(caption).then(() =>
      ToastAndroid.show(data.messages.copied, ToastAndroid.SHORT)
    );
  };

  return (
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
  );
};
