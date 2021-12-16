import React from "react"
import styled from "styled-components"
import { variant, color, ColorProps } from 'styled-system'
import { FontAwesomeIcon as FAI } from '@fortawesome/react-fontawesome'


type Props = {
  icon: string;
  solid: boolean;
  regular?: boolean;
  spin: boolean;
  variant?: string;
  onClick?: Function;
}

const faPackages = {
  solid: require("@fortawesome/free-solid-svg-icons"),
  regular: require("@fortawesome/free-regular-svg-icons"),
}

export const FontAwesomeIcon = styled<ColorProps|any>(FAI)`
  ${color};
  cursor: pointer;
  ${variant({
    variants: {
      "yellow-star": {
        color: "yellow.600",
      },
      "grey-star": {
        color: "grey.400",
      },
    }
  })};
`

const mapProps = (props: Props) => {
  const { icon, solid, regular, spin, ...rest } = props
  const iconTypeProp = [
      [solid, "solid"],
      [regular, "regular"],
    ].find(([key]) => key === true)

  // solid or reqular icon type
  const iconType = iconTypeProp ? iconTypeProp[1] : "solid"

  // eg. spinner => faSpinner
  const iconName = "fa" + icon.split("-")
                                .map(d => d[0]?.toUpperCase() + d.slice(1))
                                .join("")

  // @ts-ignore
  const iconComponent = faPackages[iconType][iconName]

  return { ...rest, icon: iconComponent, ...(spin && { className: "fa-spin" }) }
}

export const Icon = (props: Props) => <FontAwesomeIcon {...mapProps(props)} />

Icon.displayName = "Icon"

Icon.defaultProps = {
  solid: true,
  spin: false,
}
