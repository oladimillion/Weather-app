import React from 'react';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from "react-router-dom";
import theme from "../src/theme"

export const decorators = [
  (Story) => (
    <ThemeProvider theme={theme}>
      {Story()}
    </ThemeProvider>
  ),
  (Story) => (
    <BrowserRouter>
      {Story()}
    </BrowserRouter>
  ),
];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}