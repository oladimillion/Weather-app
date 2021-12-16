import React, { ComponentType } from "react";
import { Provider } from "mobx-react";
import { getDisplayName } from "../helpers";
import * as stores from "../stores";
import { IStores } from "../stores/types"


export const withStores = (appStores: IStores = stores) => (WrappedComponent: ComponentType<any>) => {
  const WithStores = (props: any) => (
    <Provider {...appStores}>
      <WrappedComponent {...props} />
    </Provider>
  )

  WithStores.displayName = `withStores(${getDisplayName(WrappedComponent)})`;
  return WithStores
};

