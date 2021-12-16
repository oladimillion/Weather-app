import React, { Fragment, ComponentType, ReactNode } from "react";
import { getDisplayName } from "../helpers";
import { Container } from "../components/Container";
import { SearchAppBar } from "../layouts/SearchAppBar";
import { NavBar } from "../layouts/NavBar";
import { Alert } from "../layouts/Alert";
import { Dialog } from "../layouts/Dialog";

export const withLayout =
  (Wrapper: any = Fragment) =>
  (WrappedComponent: ComponentType<ReactNode>) => {
    const WithLayout = (props: any) => {
      return (
        <Wrapper>
          <SearchAppBar />
          <NavBar />
          <Container>
            <WrappedComponent {...props} />
          </Container>
          <Alert />
          <Dialog />
        </Wrapper>
      );
    };

    WithLayout.displayName = `withLayout(${getDisplayName(WrappedComponent)})`;
    return WithLayout;
  };
