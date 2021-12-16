import React, { ComponentType } from "react";
import styled from "styled-components"
import { FlexBox } from "../components/FlexBox";
import { Text } from "../components/Text";
import { getDisplayName } from "../helpers";

const Info = styled("i")({
  textDecoration: "underline",
})

type State = {
  hasError: boolean;
  error?: { message: string };
  errorInfo?: { componentStack: string };
};

export const withErrorBoundary = (WrappedComponent: ComponentType<any>) => {
  class ErrorBoundary extends React.Component {
    state: State = { hasError: false };

    static getDerivedStateFromError() {
      return { hasError: true };
    }

    static displayName = `withErrorBoundary(${getDisplayName(
      WrappedComponent
    )})`;

    componentDidCatch(error: State["error"], errorInfo: State["errorInfo"]) {
      this.setState({ error, errorInfo });
    }

    render() {
      const { hasError, error, errorInfo } = this.state;
      if (hasError) {
        return (
          <FlexBox flexDirection="column" p={1}>
            <Text as="h3">
              Something went wrong: <Info>{error?.message}</Info>
            </Text>
            <Text as="pre">{errorInfo?.componentStack}</Text>
          </FlexBox>
        );
      }
      return <WrappedComponent {...this.props} />;
    }
  }

  return ErrorBoundary;
};
