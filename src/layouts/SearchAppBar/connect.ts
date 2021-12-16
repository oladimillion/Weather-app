import { compose } from "lodash/fp";
import { inject, observer } from "mobx-react";
import { withCustomRouter, withData } from "../../hoc"
import { IWeatherStore, INavigationStore } from "../../stores/types"

type Props = {
  weatherStore: IWeatherStore;
  navigationStore: INavigationStore;
  getQuery(p: string): string | null;
  basePath: string;
}

export default compose(
  withCustomRouter,
  inject("weatherStore", "navigationStore"),
  withData(async (props: Props) => {
    const { getQuery, weatherStore, navigationStore, basePath } = props;
    const cityName = getQuery("city")

    if (cityName && basePath === navigationStore.searchRoute) {
      await weatherStore.searchCities(cityName)
    }
  }, 
  { 
    showLoader: false 
  }),
  observer,
);
