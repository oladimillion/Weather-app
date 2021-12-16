import React, { ComponentType } from "react";
import { Loader } from "../components/Loader";
import { getDisplayName } from "../helpers";

export const withSuspense = (WrappedComponent: ComponentType<any>) => {
  const Suspense: ComponentType<any> = (props: object) => (
    <React.Suspense fallback={<Loader />}>
      <WrappedComponent {...props} />
    </React.Suspense>
  );
  Suspense.displayName = `withSuspense(${getDisplayName(WrappedComponent)})`;
  return Suspense
};
