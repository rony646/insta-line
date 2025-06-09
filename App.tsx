import React from "react";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import Ionicons from "@expo/vector-icons/Ionicons";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Home as HomePage } from "@/pages/Home";
import { Login as LoginPage } from "@/pages/Login";
import { History as HistoryPage } from "@/pages/History";
import { SavedCaption as SavedCaptionPage } from "@/pages/SavedCaption";
import { HistoryStackParamList, RootTabParamList } from "./navigation/types";

const HistoryStack = createNativeStackNavigator<HistoryStackParamList>();
const HomeStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator<RootTabParamList>();

function HomeStackList() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="Login" component={LoginPage} />
      <HomeStack.Screen name="HomeMain" component={TabsNavigator} />
    </HomeStack.Navigator>
  );
}

function HistoryStackList() {
  return (
    <HistoryStack.Navigator screenOptions={{ headerTitleAlign: "center" }}>
      <HistoryStack.Screen name="History" component={HistoryPage} />
      <HistoryStack.Screen
        name="SavedCaption"
        component={SavedCaptionPage}
        options={{
          headerTitle: "Saved Caption",
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
          headerTitleAlign: "center",
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
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <React.Fragment>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <NavigationContainer>
          <HomeStackList />
        </NavigationContainer>
      </ApplicationProvider>
    </React.Fragment>
  );
}
