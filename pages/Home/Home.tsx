import { Button, Input, Text } from "@ui-kitten/components";

import { data } from "./data";
import * as S from "./styles";
import { useState } from "react";
import { View } from "react-native";

export const Home = () => {
  const [inputText, setInputText] = useState<string>("");

  return (
    <S.Container>
      <S.Wrapper>
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
          disabled={!inputText}
          size="large"
          onPress={() => console.log("pressed button")}
          style={S.styles.button}
        >
          {data.button}
        </Button>

        <View
          style={{
            backgroundColor: "#ccc",
            height: 100,
            width: "100%",
            borderRadius: 10,
          }}
        >
          <Text>Result</Text>
        </View>
      </S.Wrapper>
    </S.Container>
  );
};
