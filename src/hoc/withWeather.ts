import { compose } from 'lodash/fp'
import { inject } from 'mobx-react'
import { withData } from './withData'
import { IWeatherStore } from "../stores/types"

export const withWeather = compose(
  inject('weatherStore'),
  withData((props: { weatherStore: IWeatherStore }) => {
    props.weatherStore.load()
  }),
)
