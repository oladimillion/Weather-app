import styled from 'styled-components'
import { typography, border, background, layout, space, TypographyProps, BorderProps, BackgroundProps, LayoutProps, SpaceProps } from 'styled-system'

export const TextArea = styled.textarea<TypographyProps | BorderProps | BackgroundProps | LayoutProps | SpaceProps>`
  ${border};
  ${layout};
  ${background};
  ${space};
  ${typography};
  font-family: inherit;
`

TextArea.displayName = 'TextArea'

