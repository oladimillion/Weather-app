import styled from "styled-components"
import { variant } from "styled-system"
import { FlexBox } from "../FlexBox"
import { themeGet } from "../../helpers"


export const AlertWrapper: any = styled(FlexBox)`
  margin-top: ${themeGet("space.2")};
  padding: ${themeGet("space.1")};
  padding-right: ${themeGet("space.2")};
  font-size: ${themeGet("fontSizes.1")};
  font-weight: ${themeGet("fontWeights.5")};
  border-radius: ${themeGet("radii.1")};
  height: fit-content;

  ${variant({
    variants: {
      "success": {
        backgroundColor: "green.100",
        color: "green.700",
      },
      "error": {
        backgroundColor: "red.100",
        color: "red.700",
      },
    }
  })};
`
