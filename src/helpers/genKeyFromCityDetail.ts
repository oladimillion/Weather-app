import { isEmptyValue } from "../helpers";

type City = { name?: string; region?: string; country?: string };

export const genKeyFromCityDetail = (city: City, sep: string = " ") => {
  const { name, region, country } = city;
  return [name || region, country]
    .filter((val) => !isEmptyValue(val))
    .join(sep);
};
