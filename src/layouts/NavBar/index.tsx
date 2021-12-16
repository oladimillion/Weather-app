import React from "react";
import { FlexBox } from "../../components/FlexBox";
import { Text } from "../../components/Text";
import { Icon } from "../../components/Icon";
import { INavigationStore, IWeatherStore } from "../../stores/types";
import connect from "./connect";
import { Tabs } from "./styled";

type Props = {
  navigationStore: INavigationStore;
  weatherStore: IWeatherStore;
  getQuery(p: string): string;
};

export const NavBar = connect((props: Props) => {
  const { navigationStore, weatherStore, getQuery } = props;
  const city = weatherStore.searchedCity;
  const query = city && `?city=${city}`;

  const getPath = React.useCallback(
    (to: string) => {
      return navigationStore.searchRoute === to && query ? to + query : to;
    },
    [query, navigationStore.searchRoute]
  );

  return (
    <FlexBox width="100%">
      <Tabs>
        {navigationStore.navItems
          .filter(({ to }) => {
            if (navigationStore.searchRoute === to && !query) {
              // remove "/search" from the nav bar if no city is searched
              return false;
            }
            return true;
          })
          .map((nav) => (
            <Tabs.Tab key={nav.name} to={getPath(nav.to)} exact>
              <Text as="p" ml={1}>
                {nav.name}
              </Text>
            </Tabs.Tab>
          ))}
      </Tabs>
    </FlexBox>
  );
});
