import React from "react";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import Ionicons from "@expo/vector-icons/Ionicons";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Home as HomePage } from "@/pages/Home";
import { History as HistoryPage } from "@/pages/History";
import { SavedCaption as SavedCaptionPage } from "@/pages/SavedCaption";
import {
  HistoryStackParamList,
  HomeStackParamList,
  RootTabParamList,
} from "./navigation/types";

const Stack = createNativeStackNavigator<HomeStackParamList>();
const HistoryStack = createNativeStackNavigator<HistoryStackParamList>();
const Tab = createBottomTabNavigator<RootTabParamList>();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={HomePage}
        options={{
          title: "Home - Insta Line",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#f7f7f7",
          },
        }}
      />
    </Stack.Navigator>
  );
}

function HistoryStackList() {
  return (
    <HistoryStack.Navigator>
      <HistoryStack.Screen name="History" component={HistoryPage} />
      <HistoryStack.Screen name="SavedCaption" component={SavedCaptionPage} />
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
          title: "History Tab",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="time-outline" color={color} size={size} />
          ),
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#f7f7f7",
          },
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
          <TabsNavigator />
        </NavigationContainer>
      </ApplicationProvider>
    </React.Fragment>
  );
}
