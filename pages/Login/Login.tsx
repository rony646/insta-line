import { Image, View } from "react-native";

import { Input, Button } from "@ui-kitten/components";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import * as S from "./styles";

import { data } from "./data";
import { useState } from "react";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedMode, setSelectedMode] = useState<"sign-in" | "sign-up">(
    "sign-in"
  );

  return (
    <View style={S.styles.container}>
      <View style={S.styles.logoWrapper}>
        <Image
          source={require("../../assets/app-logo.png")}
          alt="App logo"
          resizeMethod="scale"
          style={S.styles.logo}
        />
      </View>

      <View style={S.styles.tab}>
        <Button
          appearance="ghost"
          style={S.styles.tabButton}
          onPress={() => setSelectedMode("sign-in")}
          status={selectedMode === "sign-in" ? "primary" : "basic"}
        >
          {data.buttons.signIn}
        </Button>
        <Button
          appearance="ghost"
          style={S.styles.tabButton}
          onPress={() => setSelectedMode("sign-up")}
          status={selectedMode === "sign-up" ? "primary" : "basic"}
        >
          {data.buttons.signUp}
        </Button>
      </View>

      <View style={{ display: "flex", gap: 15, width: "100%" }}>
        <Input
          label="Email"
          placeholder="Enter your email"
          value={email}
          size="large"
          onChangeText={(text) => setEmail(text)}
          accessoryRight={
            <MaterialIcons name="email" size={24} color="black" />
          }
        />

        <Input
          label="Password"
          placeholder="Enter your password"
          size="large"
          value={password}
          onChangeText={(text) => setPassword(text)}
          accessoryRight={
            <MaterialIcons name="remove-red-eye" size={24} color="black" />
          }
        />

        {selectedMode === "sign-up" && (
          <Input
            label="Confirm Password"
            placeholder="Confirm your password"
            size="large"
            value={confirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
            accessoryRight={
              <MaterialIcons name="remove-red-eye" size={24} color="black" />
            }
          />
        )}

        <Button>
          {selectedMode === "sign-in"
            ? data.buttons.signIn
            : data.buttons.signUp}
        </Button>
      </View>

      {/* <View style={S.styles.buttonContainer}>
        <View style={S.styles.buttonWrapper}>
          <TouchableNativeFeedback>
            <View style={S.styles.button}>
              <AntDesign name="facebook-square" size={24} color="#1877F2" />

              <Text status="primary">{data.buttons.facebook}</Text>
            </View>
          </TouchableNativeFeedback>
        </View>

        <View style={S.styles.buttonContainer}>
          <View style={S.styles.buttonWrapper}>
            <TouchableNativeFeedback>
              <View style={S.styles.button}>
                <AntDesign name="google" size={24} color="#FFBF00" />
                <Text status="primary">{data.buttons.google}</Text>
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>
      </View> */}
    </View>
  );
};
