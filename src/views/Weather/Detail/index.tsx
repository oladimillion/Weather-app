import React from 'react';
import { observer } from "mobx-react"
import { Card } from "../../../components/Card"
import { FlexBox } from "../../../components/FlexBox"
import { Text } from "../../../components/Text"
import { Divider } from "../../../components/Divider"
import { Image } from "../../../components/Image"
import { Bookmark } from "../../../components/Bookmark"
import { Pane } from "../../../components/Pane"
import { 
  WeatherKey, 
  WeatherProperties, 
  WeatherValue, 
} from "./styled"
import { genKeyFromCityDetail as genKey } from "../../../helpers"
import { WeatherProps } from "../types"


export const DetailComponent = (props: WeatherProps) => {

  const { weatherStore } = props;
  const { 
    removeFavoriteCity, 
    addFavoriteCity,
    cityWeather, 
    favCityNames,
    favoriteCities,
  } = weatherStore
  const { location, current } = cityWeather

  const dateTime = React.useMemo(() => {
    return new Intl.DateTimeFormat("en", { 
      year: "numeric", 
      month: "2-digit", 
      day: "2-digit", 
      hour: "numeric", 
      minute: "numeric", 
      hour12: true, 
      timeZone: location?.timezone_id, 
    }).format(new Date(location.localtime))
  }, [location])

  const marked = React.useMemo(() => {
    const key = genKey(location || {})
    const index = favCityNames.indexOf(key)
    const city = favoriteCities[index]
    return !!city?.isFavorite
  }, [favCityNames, favoriteCities]) 

  return (
    <Card 
      minWidth={300} 
      mx="auto" 
      borderRadius={1}
      mb={1}
    >
      <Card.Content>
        <FlexBox
          justifyContent="space-between"
          flexDirection={["column", "row"]}
        >
          <FlexBox 
            justifyContent="space-between"
            flexDirection="column"
            mr={[0, 4]}
          >
            <Text
              as="h3"
              color="lightBlue.800"
              fontWeight={5}
              fontSize={5}
              mb={1}
            >
              {location.name} {location.region && `(${location.region})`} - {location.country}
              <Pane
                display="inline-block"
                ml={1}
                fontSize={3}
                verticalAlign="top"
              >
                <Bookmark
                  marked={marked}
                  add={() => addFavoriteCity(location)}
                  remove={() => removeFavoriteCity(location)}
                />
              </Pane>
            </Text>
            <Text
              as="h3"
              color="blueGrey.500"
              fontWeight={5}
              fontSize={8}
              lineHeight={1}
            >
              {current?.temperature || 0}&deg;C
            </Text>
            <Text
              color="blueGrey.300"
              fontWeight={5}
              fontSize={4}
              lineHeight={2}
            >
              {current?.weather_descriptions?.join(", ")} 
            </Text>
            <Text
              as="p"
              color="grey.500"
              fontSize={2}
              lineHeight={2}
              fontStyle="italic"
            >
              {dateTime}
            </Text>
          </FlexBox>
          <FlexBox 
            justifyContent="center"
            display={["none", "flex"]}
          >
            {current?.weather_icons?.map((icon) => (
              <Image 
                key={icon}
                alt="weather icon"
                src={icon}
                size={120}
                backgroundColor="transparent"
                borderRadius="50%"
              />
            ))}
          </FlexBox>
        </FlexBox>
        <FlexBox flexDirection={["column", "row"]} mt={2} mb={2}>
          <FlexBox flexDirection="column" flex={1} mr={[0, 1]}>
            <Divider />
            <WeatherProperties>
              <WeatherKey>Humility</WeatherKey>
              <WeatherValue>{current.humidity ?? 0}%</WeatherValue>
            </WeatherProperties>
            <Divider />
            <WeatherProperties>
              <WeatherKey>Pressure</WeatherKey>
              <WeatherValue>{current.pressure ?? 0} mb</WeatherValue>
            </WeatherProperties>
            <Divider />
            <WeatherProperties>
              <WeatherKey>Visibility</WeatherKey>
              <WeatherValue>{current.visibility ?? 0} km</WeatherValue>
            </WeatherProperties>
            <Divider />
          </FlexBox>
          <FlexBox flexDirection="column" flex={1} ml={[0, 1]}>
            <Divider display={["none", "block"]} />
            <WeatherProperties>
              <WeatherKey>Wind</WeatherKey>
              <WeatherValue>{current.wind ?? 0} km/h</WeatherValue>
            </WeatherProperties>
            <Divider />
            <WeatherProperties>
              <WeatherKey>Cloud Cover</WeatherKey>
              <WeatherValue>{current.cloudcover ?? 0}%</WeatherValue>
            </WeatherProperties>
            <Divider />
            <WeatherProperties>
              <WeatherKey>UV Index</WeatherKey>
              <WeatherValue>{current.uv_index ?? 0} of 10</WeatherValue>
            </WeatherProperties>
            <Divider />
          </FlexBox>
        </FlexBox>
      </Card.Content>
    </Card>
  );
}

export const Detail = observer(DetailComponent)
