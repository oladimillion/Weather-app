import styled from "styled-components"
import { FlexBox } from "../FlexBox"
import { Card } from "../Card"
import { themeGet } from "../../helpers"

export const List: any = styled(Card).attrs((props: any) => ({
  as: "ul",
  ...props,
}))`
  list-style: none;
  margin: 0;
  padding: 0;
  position: relative;
  padding-top: 0;
  padding-bottom: ${themeGet("space.1")};
  width: 100%;
  background-color: ${themeGet("colors.white")};
  min-height: 300px;
  height: calc(100vh - 150px);
  overflow-y: auto;
`

export const Header = styled(Card.Header)``

export const Item = styled(FlexBox).attrs((props: any) => ({
  as: 'li',
  ...props,
}))`
  justify-content: flex-start;
  align-items: center;
  position: relative;
  text-decoration: none;
  box-sizing: border-box;
  text-align: left;
  padding: ${themeGet("space.1")} ${themeGet("space.2")};
  width: 100%;
  max-width: 400px;
`

