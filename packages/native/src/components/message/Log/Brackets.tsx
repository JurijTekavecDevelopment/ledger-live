import React from "react";
import styled, { useTheme } from "styled-components/native";
import { Svg, Path } from "react-native-svg";
import FlexBox, { FlexBoxProps } from "../../Layout/Flex";
import { getColor } from "../../../styles";
import { ViewStyle } from "react-native";

const BracketContainer = styled(FlexBox).attrs({
  flexDirection: "column",
  position: "relative",
  justifyContent: "space-between",
})``;

type BracketProps = {
  color: string;
};

type BaseBracketProps = FlexBoxProps &
  BracketProps & {
    style?: ViewStyle;
  };

export const Bracket = ({ color, style, mb, mt }: BaseBracketProps): React.ReactElement => {
  const theme = useTheme();
  const fill = getColor(theme, color);
  return (
    <BracketContainer style={style} mb={mb} mt={mt}>
      <Svg width="17" height="10" viewBox="0 0 17 10">
        <Path d="M16.8125 0H2.8125H0.8125V2V10H2.8125V2H16.8125V0Z" fill={fill} />
      </Svg>
    </BracketContainer>
  );
};

export const BracketTopLeft = ({ color }: BracketProps) => {
  return <Bracket color={color} mb="-4px" />;
};

export const BracketTopRight = ({ color }: BracketProps) => {
  return <Bracket color={color} mb="-4px" style={{ transform: [{ scaleX: -1 }] }} />;
};

export const BracketBottomLeft = ({ color }: BracketProps) => {
  return <Bracket color={color} mt="-4px" style={{ transform: [{ scaleY: -1 }] }} />;
};

export const BracketBottomRight = ({ color }: BracketProps) => {
  return <Bracket color={color} mt="-4px" style={{ transform: [{ scale: -1 }] }} />;
};
