import styled from "styled-components";
import {
  layout,
  LayoutProps,
  space,
  SpaceProps,
  variant,
  VariantArgs,
  color,
  ColorProps,
  background,
  BackgroundProps,
  border,
  BorderProps,
  typography,
  TypographyProps,
} from "styled-system";
import { themeGet } from "../../helpers";

type ButtonProps =
  | LayoutProps
  | SpaceProps
  | VariantArgs
  | ColorProps
  | BackgroundProps
  | BorderProps
  | TypographyProps
  | { variant: string };

export const Button = styled.button<ButtonProps>`
  cursor: pointer;
  border: none;
  outline: none;
  background-color: ${themeGet("colors.white")};
  color: ${themeGet("colors.grey.500")};
  padding: ${themeGet("space.1")} ${themeGet("space.2")};
  font-weight: ${themeGet("fontWeights.6")};
  border-radius: ${themeGet("radii.1")};
  ${space};
  ${layout};
  ${color};
  ${background};
  ${border};
  ${typography};
  ${variant({
    variants: {
      primary: {
        backgroundColor: "blue.600",
        color: "white",
      },
      secondary: {
        backgroundColor: "black",
        color: "white",
      },
    },
  })};
`;

Button.displayName = "Button";

Button.defaultProps = {
  type: "button",
};
