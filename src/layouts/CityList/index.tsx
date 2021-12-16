import React from "react";
import { observer } from "mobx-react";
import { List } from "../../components/List";
import { Text } from "../../components/Text";
import { Icon } from "../../components/Icon";
import { FlexBox } from "../../components/FlexBox";
import { Bookmark } from "../../components/Bookmark";
import { StyledLink, CityListAvatar, CityListText } from "./styled";
import { FavoriteCity } from "../../stores/types";
import { genKeyFromCityDetail as genKey, isEmptyValue } from "../../helpers";

type Props = {
  items: Array<FavoriteCity>;
  title?: string;
  addCity(city: FavoriteCity): void;
  removeCity(city: FavoriteCity): void;
};

export const CityList = observer((props: Props) => {
  const { title, items, addCity, removeCity } = props;
  const getPath = React.useCallback((item: FavoriteCity) => {
    return `/weather?city=${genKey(item, ", ")}`;
  }, []);

  return (
    <List title={title}>
      {items.map((item: FavoriteCity, index: number) => {
        return (
          <List.Item mb={2} key={index}>
            <FlexBox
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              mr={1}
            >
              <Bookmark
                marked={item.isFavorite}
                add={() => addCity(item)}
                remove={() => removeCity(item)}
              />
            </FlexBox>
            <CityListAvatar>
              <Icon icon="location-dot" />
            </CityListAvatar>
            <CityListText ml={2}>
              <StyledLink to={getPath(item)}>
                {[item?.name, item?.region]
                  .filter((d) => !isEmptyValue(d))
                  .join(" - ")}
              </StyledLink>
              <Text color="grey.500">{item.country}</Text>
            </CityListText>
          </List.Item>
        );
      })}
    </List>
  );
});
