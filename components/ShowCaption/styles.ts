import styled from "styled-components/native";

interface CaptionProps {
  textColor: string;
}

export const ResultContainer = styled.View`
  background-color: #ccc;
  height: 170px;
  width: 100%;
  border-radius: 10px;
  padding: 10px;
`;

export const FlexWrapper = styled.View`
  display: flex;
  height: 100%;
`;

export const Caption = styled.Text<CaptionProps>`
  font-weight: 600;
  font-size: 16px;
  color: ${(props: CaptionProps) => props.textColor};
`;

export const CaptionContainer = styled.View`
  flex: 1;
`;

export const Touchable = styled.TouchableOpacity`
  align-self: flex-end;
`;
