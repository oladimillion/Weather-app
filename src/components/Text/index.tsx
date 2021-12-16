import styled from 'styled-components'
import { system, shadow, layout, space, typography, color, ShadowProps, LayoutProps, SpaceProps, TypographyProps, ColorProps } from 'styled-system'

const whiteSpace = system({
  // @ts-ignore
  prop: 'whiteSpace',
  // @ts-ignore
  cssProperty: 'whiteSpace',
})

export const Text = styled.div<ShadowProps | LayoutProps | SpaceProps | TypographyProps | ColorProps | { as: string, whiteSpace?: string }>`
  ${space};
  ${layout};
  ${color};
  ${typography};
  ${shadow};
  ${whiteSpace};
`

Text.displayName = 'Text'

Text.defaultProps = {
  as: 'p',
}
