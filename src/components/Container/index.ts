import styled from "styled-components";
import { themeGet } from "../../helpers";

export const Container = styled.div`
  width: 100%;
  margin-left: auto;
  box-sizing: border-box;
  margin-right: auto;
  display: block;
  padding-left: 16px;
  padding-right: 16px;
  margin-top: 16px;
  max-width: 1200px;

  ${themeGet("mediaQueries.small")} {
    padding-left: 24px;
    padding-right: 24px;
  }
`;
