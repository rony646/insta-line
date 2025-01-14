import { StatusBar } from "expo-status-bar";
import styled from "styled-components/native";

import Home from "./pages/Home";

const Container = styled.View`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: #fff;
`;

export default function App() {
  return (
    <Container>
      <Home />
      <StatusBar style="auto" />
    </Container>
  );
}
