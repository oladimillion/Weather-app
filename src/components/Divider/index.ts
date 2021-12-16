import styled from "styled-components"
import { display, space, SpaceProps, DisplayProps } from "styled-system"


export const Divider = styled.hr<DisplayProps | SpaceProps>`
  ${display};
  ${space};
  flex-shrink: 0;
  border-width: 0;
  border-style: solid;
  border-color: rgba(0, 0, 0, 0.12);
  border-bottom-width: thin;
`
