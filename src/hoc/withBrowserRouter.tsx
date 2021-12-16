import React, { ComponentType } from "react";
import { BrowserRouter } from "react-router-dom";
import { getDisplayName } from "../helpers";


export const withBrowserRouter = (WrappedComponent: ComponentType<any>) => {
  const WithBrowserRouter = (props: any) => (
    <BrowserRouter>
      <WrappedComponent {...props} />
    </BrowserRouter>
  )

  WithBrowserRouter.displayName = `withBrowserRouter(${getDisplayName(WrappedComponent)})`;
  return WithBrowserRouter
};