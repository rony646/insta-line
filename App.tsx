import React from "react";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import Ionicons from "@expo/vector-icons/Ionicons";

import { signOut } from "firebase/auth";
import { authentication } from "@/firebase/config";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import ToastManager from "toastify-react-native";

import { Home as HomePage } from "@/pages/Home";
import { Login as LoginPage } from "@/pages/Login";
import { History as HistoryPage } from "@/pages/History";
import { SavedCaption as SavedCaptionPage } from "@/pages/SavedCaption";
import {
  HistoryStackParamList,
  HomeStackParamList,
  RootTabParamList,
} from "./navigation/types";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const HistoryStack = createNativeStackNavigator<HistoryStackParamList>();
const HomeStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator<RootTabParamList>();

function HomeStackList() {
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();
  const { setLoggedInUser } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut(authentication);
      setLoggedInUser(null);
      navigation.navigate("Login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: true,
        headerTitle: "Insta Line",
        headerShadowVisible: false,
        headerBackVisible: false,
        headerRight: () => (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              width: 60,
            }}
          >
            <Ionicons
              name="exit-outline"
              size={30}
              color="#d50404"
              onPress={handleSignOut}
            />
          </View>
        ),
      }}
    >
      <HomeStack.Screen
        name="Login"
        component={LoginPage}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen name="HomeMain" component={TabsNavigator} />
    </HomeStack.Navigator>
  );
}

function HistoryStackList() {
  return (
    <HistoryStack.Navigator screenOptions={{ headerTitleAlign: "center" }}>
      <HistoryStack.Screen
        name="History"
        component={HistoryPage}
        options={{
          headerShown: false,
        }}
      />
      <HistoryStack.Screen
        name="SavedCaption"
        component={SavedCaptionPage}
        options={{
          headerShown: true,
          headerTitle: "",
          headerBackVisible: true,
        }}
      />
    </HistoryStack.Navigator>
  );
}

function TabsNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#007bff",
        tabBarInactiveTintColor: "#aaa",
        animation: "shift",
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomePage}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="HistoryTab"
        component={HistoryStackList}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="time-outline" color={color} size={size} />
          ),
          headerShown: false,
          tabBarLabel: "History",
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <React.Fragment>
      <AuthProvider>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={eva.light}>
          <NavigationContainer>
            <HomeStackList />
          </NavigationContainer>
        </ApplicationProvider>
        <ToastManager />
      </AuthProvider>
    </React.Fragment>
  );
}
