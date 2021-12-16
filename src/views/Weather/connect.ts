import { compose } from "lodash/fp";
import { withCustomRouter, withData, withWeather } from "../../hoc";
import { WeatherProps } from "./types"
import { getLocation, isEmptyValue } from "../../helpers"
import { IWeatherStore } from "../../stores/types";

type Props = {
  weatherStore: WeatherProps["weatherStore"];
  getQuery(k: string): string | null ;
}

export default compose(
  withCustomRouter,
  withWeather,
  withData(async (props: Props) => {
    const { getQuery, weatherStore } = props;
    const { 
      getGeoLocation, 
      fetchCityWeather, 
      setCityWeather,
      commitCitiesWeather,
    } = weatherStore
    let loc = getQuery("location")
    let city = getQuery("city")

    if (!loc && !city) {

      // get user agent location coords
      const coords = await getGeoLocation()
      if (coords) {
        loc = getLocation({ lat: coords.latitude, lon: coords.longitude })
      }
    }

    if (!isEmptyValue(loc || city)) {

      // fetch weather data if location or city is provided
      const query = (loc || city) as string
      await fetchCityWeather(query)
    } else {

      // clearing initail weather data 
      setCityWeather({} as IWeatherStore["cityWeather"])
    }

    return { unmount: commitCitiesWeather }
  }),
);
