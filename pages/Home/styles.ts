import { StyleSheet } from "react-native";
import styled from "styled-components/native";

interface CaptionProps {
  textColor: string;
}

export const Container = styled.View`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: #e8e7e7;
  padding: 15px;
`;

export const ResultContainer = styled.View`
  background-color: #ccc;
  height: 150px;
  width: 100%;
  border-radius: 10px;
  padding: 10px;
`;

export const FlexWrapper = styled.View`
  display: flex;
  height: 100%;
`;

export const CaptionContainer = styled.View`
  flex: 1;
`;

export const Caption = styled.Text<CaptionProps>`
  font-weight: 600;
  font-size: 20px;
  color: ${(props: CaptionProps) => props.textColor};
`;

export const Touchable = styled.TouchableOpacity`
  align-self: flex-end;
`;

export const Wrapper = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 140px;
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
