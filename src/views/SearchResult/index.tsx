import React from "react";
import { IWeatherStore, FavoriteCity } from "../../stores/types";
import { CityList } from "../../layouts/CityList";
import { Loader } from "../../components/Loader";
import { Text } from "../../components/Text";
import {
  isEmptyValue,
  getLocation,
  genKeyFromCityDetail as genKey,
} from "../../helpers";
import connect from "./connect";

type Props = {
  weatherStore: IWeatherStore;
};

const SearchResult = (props: Props) => {
  const { weatherStore } = props;
  const {
    addFavoriteCity,
    removeFavoriteCity,
    favoriteCities,
    favCityNames,
    searchResults,
    loading,
  } = weatherStore;

  const items = React.useMemo(() => {
    return searchResults.map((city: FavoriteCity) => {
      const index = favCityNames.indexOf(genKey(city));
      const storeCity = favoriteCities[index];

      return {
        ...city,
        isFavorite: !!storeCity?.isFavorite,
      };
    });
  }, [favCityNames, searchResults, favoriteCities]);

  if (loading) {
    return <Loader />;
  }

  if (isEmptyValue(items)) {
    return (
      <Text mt={4} as="h3" textAlign="center" color="grey.700">
        No result found
      </Text>
    );
  }

  return (
    <CityList
      title="Search Results"
      items={items}
      addCity={addFavoriteCity}
      removeCity={removeFavoriteCity}
    />
  );
};

export default connect(SearchResult);
