import React from 'react'
import { act } from 'react-dom/test-utils';
import { render, fireEvent } from "test-utils"
import { Weather as WeatherStore } from 'stores/Weather'
import { IWeatherStore } from 'stores/types'
import { Dialog } from 'layouts/Dialog'
import Weather from ".."

jest.mock("hoc/withData")

describe("<Weather />", () => {

	let weatherStore: IWeatherStore
	const cityWeather: any = require("stores/data/cityWeather.json")

	beforeEach(() => {
		weatherStore = new WeatherStore()
	})
	
	it("should render correctly", () => {
		const { getByText } = render(<Weather />)
		expect(getByText(/No weather data available/i)).toBeInTheDocument()
	})

	it("should contain city weather information", () => {
		const props = { weatherStore }
		weatherStore.setCityWeather(cityWeather)
		weatherStore.fetchCityWeather("lagos")
		const { getByText } = render(<Weather {...props} />)
		expect(getByText(/Lagos/i)).toBeInTheDocument()
		expect(getByText(/Sunny/i)).toBeInTheDocument()
		expect(getByText("12/14/2021, 5:03 PM")).toBeInTheDocument()
		expect(getByText(/Humility/i)).toBeInTheDocument()
		expect(getByText(/Wind/i)).toBeInTheDocument()
	})

	it("should allow adding/editing/deleting of notes", async () => {
		const props = { weatherStore }
		weatherStore.setCityWeather(cityWeather)

		const { getByText, queryByText, container } = render(
			<>
				<Weather {...props} />
				<Dialog />
			</>
		)

		// adding textarea, save button to the dom
		const noteToggleBtn = container.querySelector("button")
		expect(noteToggleBtn).toBeInTheDocument()
		expect(getByText(/Kindly add some notes/i)).toBeInTheDocument()
		await fireEvent.click(noteToggleBtn)
		expect(container.contains(noteToggleBtn)).toBeFalsy()

		// creating a new note
		const textarea = container.querySelector("textarea")
		await fireEvent.change(textarea, { target: { value: "note 1"}})
		expect(textarea.value).toEqual("note 1")
		
		// saving the new note
		await fireEvent.click(getByText(/Save/i))
		expect(getByText(/note 1/i)).toBeInTheDocument()
		expect(queryByText(/Kindly add some notes/i)).toBeNull()

		// lists of notes
		const notes = container.querySelectorAll("li")
		expect(Array.from(notes).length).toEqual(1)
		
		// editing existing note
		const note = container.querySelector("li")
		const editBtn = Array.from(note.querySelectorAll("svg"))[0]
		await fireEvent.click(editBtn)
		const noteTextarea = note.querySelector("textarea")
		await fireEvent.change(noteTextarea, { target: { value: "note 2"}})
		expect(noteTextarea.value).toEqual("note 2")

		// saving updated note
		await fireEvent.click(getByText(/Save/i))
		expect(queryByText(/note 1/i)).toBeNull()
		expect(getByText(/note 2/i)).toBeInTheDocument()

		// deleting the existing note
		const updatedNote = container.querySelector("li")
		const deleteBtn = Array.from(updatedNote.querySelectorAll("svg"))[1]
		await fireEvent.click(deleteBtn)
		await act(async () => {
			await fireEvent.click(getByText(/Yes/i))
		})
		expect(container.querySelector("li")).toBeFalsy()
		expect(getByText(/Kindly add some notes/i)).toBeInTheDocument()
	})
})
