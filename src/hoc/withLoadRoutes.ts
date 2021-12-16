import { compose } from "lodash/fp";
import { withRouter } from "react-router-dom";
import { withErrorBoundary } from "./withErrorBoundary";
import { withSuspense } from "./withSuspense";

export const withLoadRoutes = compose(
  withErrorBoundary,
  withSuspense,
  withRouter
);
