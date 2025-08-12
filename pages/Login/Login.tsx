import { useEffect, useState } from "react";

import { Image, View } from "react-native";

import { Input, Button } from "@ui-kitten/components";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import { Toast } from "toastify-react-native";

import { data } from "./data";
import { useAuth } from "@/contexts/AuthContext";

import { authentication } from "@/firebase/config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

import * as S from "./styles";
import { useNavigation } from "@react-navigation/native";
import { HomeStackParamList } from "@/navigation/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type NavigationProps = NativeStackNavigationProp<HomeStackParamList, "Login">;

export const Login = () => {
  const navigation = useNavigation<NavigationProps>();

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedMode, setSelectedMode] = useState<"sign-in" | "sign-up">(
    "sign-in"
  );
  const [loading, setLoading] = useState(false);

  const { loggedInUser, setLoggedInUser } = useAuth();
  const user = authentication.currentUser;

  const handleSignUp = async () => {
    setLoading(true);
    try {
      const res = await createUserWithEmailAndPassword(
        authentication,
        email,
        password
      );
      if (res.user) {
        await updateProfile(res.user, {
          displayName: userName,
        });
        setLoggedInUser(res.user);
      }
    } catch (error) {
      Toast.error("Failed to create account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async () => {
    setLoading(true);

    try {
      const res = await signInWithEmailAndPassword(
        authentication,
        email,
        password
      );
      if (res.user) {
        setLoggedInUser(res.user);
      }
    } catch (error) {
      console.error("Error signing in:", error);
      Toast.error("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loggedInUser || user) {
      if (user && !loggedInUser) {
        setLoggedInUser(user);
      }
      navigation.navigate("HomeMain");
      return;
    }
  }, [user]);

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
        {selectedMode === "sign-up" && (
          <Input
            label="Your username"
            placeholder="Enter your username"
            value={userName}
            size="large"
            onChangeText={(text) => setUserName(text)}
            accessoryRight={
              <MaterialIcons name="person" size={24} color="black" />
            }
          />
        )}

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
              <MaterialIcons name="check-circle" size={24} color="black" />
            }
          />
        )}

        <Button
          disabled={loading}
          onPress={selectedMode === "sign-in" ? handleSignIn : handleSignUp}
        >
          {selectedMode === "sign-in"
            ? data.buttons.signIn
            : data.buttons.signUp}
        </Button>
      </View>
    </View>
  );
};
