import React from "react";
import styled from "styled-components";
import { Icon } from "../Icon";
import { FlexBox } from "../FlexBox";
import { themeGet } from "../../helpers";

const StyledFlexBox = styled(FlexBox)`
  width: 100%;
  height: 100%;
  min-height: 300px;
  justify-content: center;
  align-items: center;
  font-size: ${themeGet("space.4")};
  color: ${themeGet("colors.blueGrey.400")};
`;

export const Loader = () => (
  <StyledFlexBox>
    <Icon icon="spinner" spin />
  </StyledFlexBox>
);
