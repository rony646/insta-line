import { View } from "react-native";

import ReanimatedCarousel from "react-native-reanimated-carousel";

import * as S from "./styles";
import { ImageType } from "./types";

interface CarouselProps {
  images: ImageType[];
}

export const Carousel = ({ images }: CarouselProps) => {
  return (
    <View>
      <ReanimatedCarousel
        width={350}
        height={160}
        data={images}
        mode="parallax"
        renderItem={({ item }) => (
          <S.ImageContainer>
            <S.Image source={{ uri: item.uri }} />
          </S.ImageContainer>
        )}
      />
    </View>
  );
};
