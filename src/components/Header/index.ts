import styled from "styled-components";
import { themeGet } from "../../helpers";
import { Text } from "../Text";

export const Header = styled(Text).attrs(() => ({
  as: "header",
}))`
  line-height: 2.5;
  color: ${themeGet("colors.grey.600")};
  font-weight: ${themeGet("fontWeights.6")};
  font-size: ${themeGet("fontSizes.1")};
  padding-left: ${themeGet("space.2")};
  padding-right: ${themeGet("space.2")};
  position: sticky;
  top: 0;
  z-index: 1;
  background-color: ${themeGet("colors.white")};
`;
