import styled from "styled-components";
import {
  border,
  background,
  layout,
  space,
  shadow,
  BorderProps,
  BackgroundProps,
  LayoutProps,
  SpaceProps,
  ShadowProps,
} from "styled-system";
import { Header } from "../Header";
import { themeGet } from "../../helpers";

export type CardProps =
  | BorderProps
  | BackgroundProps
  | LayoutProps
  | SpaceProps
  | ShadowProps;

export const Card: any = styled.div<CardProps>`
  border-radius: ${themeGet("radii.1")};
  box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);
  overflow: hidden;
  ${border};
  ${layout};
  ${background};
  ${space};
  ${shadow};
`;

Card.displayName = "Card";

Card.Header = styled(Header)`
  padding-top: ${themeGet("space.1")};
`;

Card.Content = styled.div<SpaceProps>`
  background-color: ${themeGet("colors.white")};
  padding: ${themeGet("space.2")};
  ${space};
  &:last-child {
    padding-bottom: ${themeGet("space.2")};
  }
`;
