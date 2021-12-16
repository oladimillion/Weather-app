import styled from "styled-components";
import { Text } from "../../../components/Text"
import { FlexBox } from "../../../components/FlexBox"
import { themeGet } from "../../../helpers"


export const WeatherProperties = styled(FlexBox)({
  flexDirection: "row",
  justifyContent: "space-between",
  margin: "10px 0",
})


export const WeatherKey = styled(Text)`
  font-weight: ${themeGet("fontWeights.5")};
  color: ${themeGet("colors.blueGrey.400")};
`

export const WeatherValue = styled(Text)`
  font-weight: ${themeGet("fontWeights.5")};
  color: ${themeGet("colors.grey.700")};
`
