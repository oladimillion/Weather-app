import styled from 'styled-components'
import { color, border, background, layout, BorderProps, BackgroundProps, LayoutProps, ColorProps } from 'styled-system'

export const Image = styled.img<BorderProps | BackgroundProps | LayoutProps | ColorProps | { src: string, alt?: string }>`
  ${border};
  ${layout};
  ${background};
  ${color};
`

Image.displayName = 'Image'

