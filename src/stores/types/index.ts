
type WeatherDetail = {
  location: {
    name: string;
    region: string;
    country: string;
    timezone_id: string;
    localtime: string;
    isFavorite?: boolean;
  };
  current: {
    temperature: number;
    weather_icons: Array<string>;
    weather_descriptions: Array<string>;
    pressure: number;
    humidity: number;
    cloudcover: number;
    uv_index: number;
    visibility: number;
    wind: number;
  };
  notes: Array<string>;
}

export type FavoriteCity = {
  name: string; 
  region: string; 
  country: string;
  lat?: string;
  lon?: string;
  isFavorite?: boolean;
}

export interface IWeatherStore {
  cityWeather: WeatherDetail;
  favoriteCities: Array<FavoriteCity>;
  searchResults: Array<FavoriteCity>;
  favCityNames: Array<string>;
  loading: boolean;
  searchedCity?: string;
  load(): void;
  getCachedCityWeather(cityName: string): WeatherDetail;
  searchCities(cityName: string): Promise<any>;
  setCityWeather(cityWeather: WeatherDetail): void;
  fetchCityWeather(cityName: string): Promise<any>;
  getGeoLocation(): Promise<any> | any;
  addFavoriteCity(city: FavoriteCity): void;
  removeFavoriteCity(city: FavoriteCity): void;
  commitFavoriteCities(): void;
  retrieveFavoriteCities(): void;
  commitCitiesWeather(): void;
  retrieveCitiesWeather(): void;
  addNote(n: string): void;
  updateNote(n: string, i: number): void;
  removeNote(i: number): void;
  getCachedCityWeather(k: string): WeatherDetail;
  setFavoriteCities(favCities: Array<FavoriteCity>): void;
  setSearchResults(searchResults: Array<FavoriteCity>): void;
}

export type AlertProps = { 
  content?: any; 
  status?: "success" | "error";
}

export type DialogProps = {
  title?: string;
  content?: string;
  actions?: Array<{ label: string; onClick(): void }>;
};

export interface IAppStore {
  alert: AlertProps;
  dialog: DialogProps;
  setDialog(d: DialogProps): void;
  setAlert(d: AlertProps): void;
}

export interface INavigationStore {
  navItems: { icon: string; name: string; to: string; exact?: boolean }[];
  searchRoute: string;
}

export interface IStores {
  weatherStore: IWeatherStore;
  appStore: IAppStore;
  navigationStore: INavigationStore;
}

export interface IStore {
  api: any;
  deepToJS(d: any): object;
  toJS(d: any): object;
  getStore(k: string): object;
}
