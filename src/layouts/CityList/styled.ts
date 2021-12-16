import styled from "styled-components"
import { Link } from "react-router-dom"
import { Text } from "../../components/Text"
import { FlexBox } from "../../components/FlexBox"
import { themeGet } from "../../helpers"


export const StyledLink = styled(Link)(({ theme }) => ({
  color: theme.colors.lightBlue[500],
  textDecoration: "none",
  fontWeight: theme.fontWeights[5],
}))

export const CityListText = styled(FlexBox)`
  flex: 1 1 auto;
  min-width: 0;
  flex-direction: column;
`

export const CityListAvatar = styled(FlexBox)`
    position: relative;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: ${themeGet("space.4")};
    height: ${themeGet("space.4")};
    font-size: ${themeGet("fontSizes.3")};
    line-height: 1;
    border-radius: 50%;
    overflow: hidden;
    user-select: none;
    color: ${themeGet("colors.white")};
    background-color: ${themeGet("colors.grey.400")};
`

