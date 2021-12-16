import styled from "styled-components"
import { FlexBox } from "../FlexBox"
import { themeGet } from "../../helpers"


export const DialogWrapper: any = styled(FlexBox)`
  background-color: ${themeGet("colors.transparent.grey40")};
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`
