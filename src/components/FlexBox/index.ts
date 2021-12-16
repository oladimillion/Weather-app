import styled from "styled-components";
import {
  background,
  layout,
  space,
  flexbox,
  BackgroundProps,
  LayoutProps,
  SpaceProps,
  FlexboxProps,
} from "styled-system";

export const FlexBox = styled.div<
  | BackgroundProps
  | LayoutProps
  | SpaceProps
  | FlexboxProps
  | { display: string }
>`
  ${space};
  ${layout};
  ${flexbox};
  ${background};
`;

FlexBox.displayName = "FlexBox";

FlexBox.defaultProps = {
  display: "flex",
};
