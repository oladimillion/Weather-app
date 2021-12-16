import React, { ComponentType } from "react";
import { makeObservable, observable, runInAction, action } from "mobx";
import { observer } from "mobx-react";
import { compose } from "lodash/fp";
import { get } from "lodash";
import check from "check-types";
import { Loader } from "../components/Loader";
import { getDisplayName } from "../helpers";
import { withCustomRouter } from "./withCustomRouter";

const noop = async () => ({});
type Props = {
  redirectToPath(p: string): void;
};

export const withData =
  (getData = noop as Function, options: any = {}) =>
  (WrappedComponent: ComponentType<any>) => {
    class Data extends React.Component<Props> {
      static displayName = `withData(${getDisplayName(WrappedComponent)})`;

      showLoader: boolean = get(options, "showLoader", true);

      loaded: boolean = false;

      data: any = null;

      // function to call when component unmounts
      unmount?: Function | null = null;

      constructor(props: Props) {
        super(props);

        makeObservable(this, {
          loaded: observable,
          data: observable,
          getData: action,
        });
      }

      componentDidMount() {
        this.getData();
      }

      componentWillUnmount() {
        if (check.function(this.unmount)) {
          this.unmount();
        }
      }

      getData = async () => {
        const { redirectToPath } = this.props;
        try {
          const data: any = (await getData(this.props)) || {};

          const { redirectTo, unmount, ...rest } = data;

          this.unmount = unmount || null;

          runInAction(() => {
            this.loaded = false;
          });

          if (redirectTo) {
            return redirectToPath(redirectTo as string);
          }

          runInAction(() => {
            this.data = rest || null;
          });
        } finally {
          runInAction(() => {
            this.loaded = true;
          });
        }
      };

      render() {
        if (!this.loaded && this.showLoader) {
          return <Loader />;
        }
        return <WrappedComponent {...this.props} {...this.data} />;
      }
    }

    const DataComponent = observer(Data);
    return compose(withCustomRouter)(DataComponent);
  };
