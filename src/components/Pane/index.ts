import styled from "styled-components";
import {
  color,
  ColorProps,
  typography,
  TypographyProps,
  space,
  SpaceProps,
  layout,
  LayoutProps,
  background,
  BackgroundProps,
  border,
  BorderProps,
  position,
  PositionProps,
  shadow,
  ShadowProps,
} from "styled-system";

export const Pane = styled.div<
  | ColorProps
  | TypographyProps
  | SpaceProps
  | LayoutProps
  | BackgroundProps
  | BorderProps
  | PositionProps
  | ShadowProps
>`
  ${color};
  ${typography};
  ${space};
  ${layout};
  ${background};
  ${border};
  ${position};
  ${shadow};
`;
