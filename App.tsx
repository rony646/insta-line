import React from "react";

import * as eva from "@eva-design/eva";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";

import Ionicons from "@expo/vector-icons/Ionicons";

import { Home as HomePage } from "./pages/Home";
import { History as HistoryPage } from "./pages/History";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createStaticNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const RootStack = createNativeStackNavigator({
  screens: {
    HomeScreen: {
      screen: HomePage,

      options: {
        title: "Home - Insta Line",
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: "#f7f7f7",
        },
      },
    },
  },
});

const TabsNavigator = createBottomTabNavigator({
  screens: {
    Home: {
      screen: RootStack,
      options: {
        headerShown: false,
        tabBarIcon: ({ color }) => (
          <Ionicons name="home-outline" color={color} size={24} />
        ),
      },
    },
    History: {
      screen: HistoryPage,
      options: {
        title: "History",
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: "#f7f7f7",
        },
        tabBarIcon: ({ color }) => (
          <Ionicons name="time-outline" color={color} size={24} />
        ),
      },
    },
  },
});

const Navigation = createStaticNavigation(TabsNavigator);

export default function App() {
  return (
    <React.Fragment>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <Navigation />
      </ApplicationProvider>
    </React.Fragment>
  );
}
