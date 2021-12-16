import styled, { keyframes } from "styled-components"
import { variant, VariantArgs } from "styled-system"
import { get } from "lodash"
import { Pane } from "../Pane"


const fadeInOut = keyframes`
  0% {
    display: flex; 
    opacity: 0; 
  }

  10% {
    opacity: 1; 
  }

  90% {
    opacity: 1; 
  }

  100% {
    display: none; 
    opacity: 0; 
  }
`


const modalOpen = keyframes`
  from {
    opacity: 0; 
  }

  to {
    opacity: 1; 
  }
}
`

const modalClose = keyframes`
  from {
    opacity: 1; 
  }

  to {
    opacity: 0; 
  }
}
`


const getAnimationName = ({ variant }: { variant : string }) => {
  const animations = {
    "alert": fadeInOut,
    "modal-open": modalOpen,
    "modal-close": modalClose,
  }

  return get(animations, variant)
}

export const AnimationWrapper = styled<VariantArgs | any>(Pane)`
  animation-name: ${getAnimationName};
  animation-duration: ${({ duration }: { duration : number }) => duration}s;
  animation-fill-mode: forward;

  ${variant({
    variants: {
      alert: {
        animationTimingFunction: "ease-in-out",
      },
    }
  })}
`
