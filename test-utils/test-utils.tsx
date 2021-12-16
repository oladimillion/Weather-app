import React, { FC, ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { compose } from "lodash/fp";
import { withTheme, withStores, withBrowserRouter } from "../src/hoc";

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => {
  const Wrapper = ({ children }: { children: ReactElement }) => {
    const Composed: FC = compose(
      withBrowserRouter,
      withStores(),
      withTheme()
    )(() => children);
    return <Composed />;
  };

  return render(ui, { wrapper: Wrapper, ...options });
};

export * from "@testing-library/react";
export { customRender as render };
