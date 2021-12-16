import React, { ComponentType, ReactNode } from "react";
import { ThemeProvider } from "styled-components";
import { getDisplayName } from "../helpers";
import theme from "../theme";

export const withTheme =
  (appTheme = theme) =>
  (WrappedComponent: ComponentType<ReactNode>) => {
    const WithTheme = (props: any) => (
      <ThemeProvider theme={appTheme}>
        <WrappedComponent {...props} />
      </ThemeProvider>
    );

    WithTheme.displayName = `withTheme(${getDisplayName(WrappedComponent)})`;
    return WithTheme;
  };
