import React from "react";
import { isEmptyValue } from "../../helpers"
import { Text } from "../../components/Text"
import { Detail } from "./Detail"
import { Notes } from "./Notes"
import { WeatherProps } from "./types"
import connect from "./connect";

export const Weather = (props: WeatherProps) => {

  const { weatherStore } = props

  if (isEmptyValue(weatherStore.cityWeather)) {
    return (
      <Text 
        mt={4}
        as="h3" 
        textAlign="center" 
        color="grey.700"
      >
        No weather data available
      </Text>
    )
  }

  return (
    <>
      <Detail {...props} />
      <Notes {...props} />
    </>
  );
};

export default connect(Weather);
