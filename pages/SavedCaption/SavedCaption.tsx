import { HistoryStackParamList } from "@/navigation/types";
import { RouteProp, useRoute } from "@react-navigation/native";
import { Input } from "@ui-kitten/components";
import * as S from "./styles";
import ShowCaption from "@/components/ShowCaption";
import Carousel from "@/components/Carousel";
import { data } from "./data";

export const SavedCaption = () => {
  const route = useRoute<RouteProp<HistoryStackParamList, "SavedCaption">>();

  const captionData = route.params || {};
  const { caption, images, inputText } = captionData;

  return (
    <S.Container>
      <S.Wrapper>
        {images.length ? <Carousel images={images} /> : null}

        <Input
          value={inputText}
          textStyle={{ height: 100 }}
          multiline
          numberOfLines={10}
          status="info"
          style={S.styles.input}
          placeholder={data.input.placeholder}
        />

        <ShowCaption caption={caption} />
      </S.Wrapper>
    </S.Container>
  );
};
