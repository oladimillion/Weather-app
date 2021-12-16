import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { Text } from "../../components/Text";
import { themeGet } from "../../helpers";

export const Tabs: any = styled.div`
  box-pack: center;
  justify-content: center;
  margin: auto;
`;

const Tab = styled(NavLink)`
  display: inline-flex;
  background-color: transparent;
  cursor: pointer;
  user-select: none;
  text-decoration: none;
  font-weight: ${themeGet("fontWeights.5")};
  font-size: ${themeGet("fontSizes.1")};
  line-height: 2;
  text-transform: uppercase;
  max-width: 360px;
  min-width: 90px;
  min-height: 48px;
  padding: 12px 16px;
  overflow: hidden;
  text-align: center;
  color: ${themeGet("colors.grey.600")};
  position: relative;
  align-items: center;
  letter-spacing: 2px;

  &:hover,
  &:visited,
  &:active {
    color: ${themeGet("colors.grey.600")};
  }

  &.active {
    color: ${themeGet("colors.blue.700")};
  }

  &.active::before {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 2px;
    background: currentColor;
  }

  ${Text} {
    color: currentColor;
  }
`;

Tabs.Tab = Tab;
