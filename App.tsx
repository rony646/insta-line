import * as eva from "@eva-design/eva";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";

import Home from "./pages/Home";
import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createStaticNavigation } from "@react-navigation/native";
import { generatePostCaption } from "./services/endpoints";

const RootStack = createNativeStackNavigator({
  screens: {
    Home: {
      screen: Home,
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

const Navigation = createStaticNavigation(RootStack);

export default function App() {
  async function testMyEndpoint() {
    try {
      const response = await generatePostCaption("test");
      console.log(response);
    } catch (error) {
      console.log("err: ", error);
    }
  }

  useEffect(() => {
    testMyEndpoint();
  }, []);

  return (
    <React.Fragment>
      <IconRegistry icons={EvaIconsPack} />

      <ApplicationProvider {...eva} theme={eva.light}>
        <Navigation />
      </ApplicationProvider>
    </React.Fragment>
  );
}
