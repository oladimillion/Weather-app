import React from "react";
import { IWeatherStore } from "../../stores/types";
import { CityList } from "../../layouts/CityList";
import connect from "./connect";

type Props = {
  weatherStore: IWeatherStore;
};

const Favorites = (props: Props) => {
  const { weatherStore } = props;
  const { addFavoriteCity, removeFavoriteCity, favoriteCities } = weatherStore;

  return (
    <CityList
      title="Favorites"
      items={favoriteCities}
      addCity={addFavoriteCity}
      removeCity={removeFavoriteCity}
    />
  );
};

export default connect(Favorites);
