
import React, { ComponentType, ReactNode } from "react"

export const withData = () => (WrappedComponent: ComponentType<ReactNode>) => {
  const Enchance = (props: any) => (
    <WrappedComponent {...props} />
  )

  return Enchance
}