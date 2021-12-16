import React from 'react'
import styled from 'styled-components'
import { Link as BaseLink } from 'react-router-dom'
import { Text } from '../Text'

const RouterLink: any = styled(BaseLink)`
  ${Text} {
  } ;
`

RouterLink.displayName = 'RouterLink'

RouterLink.defaultProps = {
  to: '',
}

const ExternalLink: any = styled(Text).attrs(() => ({
  as: 'a'
}))``

ExternalLink.displayName = 'ExternalLink'

type Props = {
  href?: string | null;
  as?: string;
  target?: string;
  rel?: string;
  to?: string;
  children?: React.ReactNode;
  external?: boolean;
}


ExternalLink.defaultProps = {
  href: null,
  as: 'a',
  target: '_blank',
  rel: 'noreferrer noopener',
}

export const Link = (props: Props) => {
  const { to, children, external, href, ...rest } = props
  return external ? (
    <ExternalLink {...rest} href={href}>{children || href}</ExternalLink>
  ) : (
    <RouterLink to={to} {...rest}>
      {children || to}
    </RouterLink>
  )
}

Link.defaultProps = {
  href: null,
  to: '',
  children: null,
  external: false,
}

