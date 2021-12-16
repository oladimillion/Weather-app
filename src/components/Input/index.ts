import styled from 'styled-components'
import { border, background, layout, space, BorderProps, BackgroundProps, LayoutProps, SpaceProps } from 'styled-system'

export const Input = styled.input<BorderProps | BackgroundProps | LayoutProps | SpaceProps>`
  ${border};
  ${layout};
  ${background};
  ${space};
`

Input.displayName = 'Input'

