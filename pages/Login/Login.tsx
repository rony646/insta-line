import { View } from "react-native";

import { Text, Button } from "@ui-kitten/components";

import * as S from "./styles";

export const Login = () => {
  return (
    <View style={S.styles.container}>
      <View style={S.styles.logoWrapper}>
        <View style={{ width: 80, height: 80, backgroundColor: "green" }}>
          logo
        </View>
        <Text category="h1">Insta Line</Text>
      </View>

      <View style={{ display: "flex", gap: 15 }}>
        <Button appearance="outline" style={{ width: 220 }}>
          Sign In with Facebook
        </Button>
        <Button appearance="outline" style={{ width: 220 }}>
          Sing In with Google
        </Button>
      </View>
    </View>
  );
};
