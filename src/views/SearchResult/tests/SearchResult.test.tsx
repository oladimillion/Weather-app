import React from 'react'
import { render, fireEvent } from "test-utils"
import { Weather as WeatherStore } from 'stores/Weather'
import { IWeatherStore } from 'stores/types'
import { Alert } from 'layouts/Alert'
import { genKeyFromCityDetail as genKey } from "helpers";

import SearchResult from ".."

jest.mock("hoc/withData")

describe("<SearchResult />", () => {

	let weatherStore: IWeatherStore
  const searchResults = require("stores/data/searchResults.json")

	beforeEach(() => {
		weatherStore = new WeatherStore()
	})
	
	it("should render correctly", () => {
		const { getByText, container } = render(<SearchResult />)
		expect(getByText(/No result found/i)).toBeInTheDocument()
    const favCity = container.querySelector("li")
    expect(container.contains(favCity)).toBeFalsy()
	})

  it("should contain search results", () => {
    weatherStore.setSearchResults(searchResults)
		const { getByText, container } = render(<SearchResult weatherStore={weatherStore} />)
    expect(getByText(/Search Results/i)).toBeInTheDocument()
    const favCities = container.querySelectorAll("li")
    expect(favCities.length).toEqual(1)
	})

  it("should be able to toggle bookmark", async () => {
    weatherStore.setSearchResults(searchResults)
		const { getByText, container } = render(
      <>
        <SearchResult weatherStore={weatherStore} />
        <Alert />
      </>
    )
    const searchList = container.querySelectorAll("li")
    const cityIndex = 0
    const city = weatherStore.searchResults[cityIndex]
    const addMessage = `"${genKey(city, " - ")}" added to favorite`
    const removeMessage = `"${genKey(city, " - ")}" removed from favorite`
    const searchCity = searchList[cityIndex]
    const bookmark = searchCity.querySelector('svg')

    // add city to favorite
    await fireEvent.click(bookmark)
    expect(getByText(addMessage)).toBeInTheDocument()
    
    // remove city from favorite
    await fireEvent.click(bookmark)
    expect(getByText(removeMessage)).toBeInTheDocument()

	})
})