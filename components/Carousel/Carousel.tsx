import { View, Text } from "react-native";

import ReanimatedCarousel from "react-native-reanimated-carousel";

import * as S from "./styles";

interface CarouselProps {
  images: string[];
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
            <S.Image source={{ uri: item }} />
          </S.ImageContainer>
        )}
      />
    </View>
  );
};
