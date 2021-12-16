import React from "react";
import { render, fireEvent } from "test-utils";
import { Weather as WeatherStore } from "stores/Weather";
import { IWeatherStore } from "stores/types";
import { Alert } from "layouts/Alert";
import { genKeyFromCityDetail as genKey } from "helpers";

import Favorite from "..";

jest.mock("hoc/withData");

describe("<Favorite />", () => {
  let weatherStore: IWeatherStore;

  beforeEach(() => {
    weatherStore = new WeatherStore();
  });

  it("should render correctly", () => {
    const { getByText, container } = render(<Favorite />);
    expect(getByText(/Favorites/i)).toBeInTheDocument();
    const favCity = container.querySelector("li");
    expect(container.contains(favCity)).toBeFalsy();
  });

  it("should contain favorite cities", () => {
    weatherStore.load();
    const { getByText, container } = render(
      <Favorite weatherStore={weatherStore} />
    );
    expect(getByText(/Favorites/i)).toBeInTheDocument();
    const favCities = container.querySelectorAll("li");
    expect(favCities.length).toEqual(15);
  });

  it("should be able to toggle bookmark", async () => {
    weatherStore.load();
    const { getByText, container } = render(
      <>
        <Favorite weatherStore={weatherStore} />
        <Alert />
      </>
    );
    const favList = container.querySelectorAll("li");
    const favCityIndex = 0;
    const city = weatherStore.favoriteCities[favCityIndex];
    const addMessage = `"${genKey(city, " - ")}" added to favorite`;
    const removeMessage = `"${genKey(city, " - ")}" removed from favorite`;
    const favCity = favList[favCityIndex];
    const bookmark = favCity.querySelector("svg");

    // remove city from favorite
    await fireEvent.click(bookmark);
    expect(getByText(removeMessage)).toBeInTheDocument();

    // add city to favorite
    await fireEvent.click(bookmark);
    expect(getByText(addMessage)).toBeInTheDocument();
  });
});
