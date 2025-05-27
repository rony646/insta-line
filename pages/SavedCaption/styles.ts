import { StyleSheet } from "react-native";
import styled from "styled-components/native";

export const Container = styled.View`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: #e8e7e7;
  padding: 15px;
`;

export const Wrapper = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
  gap: 35px;
  width: 100%;
  height: 100%;
`;

export const styles = StyleSheet.create({
  input: {
    borderRadius: 10,
  },
  button: {
    width: "100%",
  },
});
