import { StatusBar } from "expo-status-bar";
import styled from "styled-components/native";
import * as eva from "@eva-design/eva";
import { ApplicationProvider } from "@ui-kitten/components";

import Home from "./pages/Home";

const Container = styled.View`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: #e8e8e8;
`;

export default function App() {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <Container>
        <Home />
        <StatusBar style="auto" />
      </Container>
    </ApplicationProvider>
  );
}
