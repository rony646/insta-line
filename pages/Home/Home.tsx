import { View } from "react-native";
import * as S from "./styles";
import { Text, Button } from "@ui-kitten/components";

export const Home = () => {
  return (
    <View>
      <S.Title>Home Page</S.Title>
      <Text>Text from eva</Text>
      <Button status="success">Eva button</Button>
    </View>
  );
};
