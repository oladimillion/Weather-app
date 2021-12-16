import styled from "styled-components";
import { FlexBox } from "../../components/FlexBox";
import { Input } from "../../components/Input";
import { themeGet } from "../../helpers";

export const AppBar = styled.header`
  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%),
    0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);
  display: flex;
  flex-direction: column;
  width: 100%;
  flex-shrink: 0;
  position: static;
  background-color: ${themeGet("colors.blue.700")};
  color: ${themeGet("colors.white")};
`;

export const ToolBar = styled(FlexBox)`
  position: relative;
  align-items: center;
  padding: 0 ${themeGet("space.2")};
  min-height: ${themeGet("space.5")};

  ${themeGet("mediaQueries.small")} {
    padding: 0 ${themeGet("space.4")};
    min-height: 56px;
  }
`;

export const Search = styled.form`
  position: relative;
  border-radius: ${themeGet("radii.1")};
  background-color: rgba(255, 255, 255, 0.15);

  ${themeGet("mediaQueries.small")} {
    width: 100%;
  }
`;

export const SearchIconWrapper = styled(FlexBox)`
  padding: 0 ${themeGet("space.2")};
  height: 100%;
  position: absolute;
  pointer-events: none;
  align-items: center;
  justify-content: center;
`;

export const InputWrapper = styled.div`
  width: 300px;
  ${themeGet("mediaQueries.small")} {
    width: 100%;
  }
`;

export const StyledInput = styled(Input)`
  padding: ${themeGet("space.1")} ${themeGet("space.2")};
  padding-left: calc(${themeGet("space.4")} + 1rem);
  border: none;
  width: 100%;
  color: ${themeGet("colors.lightBlue.50")};
  font-size: ${themeGet("fontSizes.2")};
  outline: none;
  background: transparent;
  cursor: text;
  letter-spacing: 1;

  &::placeholder {
    color: inherit;
  }
`;
