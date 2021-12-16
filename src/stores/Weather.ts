import {
  observable,
  computed,
  makeObservable,
  action,
  runInAction,
} from "mobx";
import { Store } from "./Store";
import { IWeatherStore, FavoriteCity } from "./types";
import { isEmptyValue, genKeyFromCityDetail as genKey } from "../helpers";

export class Weather extends Store implements IWeatherStore {
  static key = "weather";

  favoriteCities: IWeatherStore["favoriteCities"] = [];
  searchResults: IWeatherStore["searchResults"] = [];
  cityWeather: IWeatherStore["cityWeather"] | any = {};
  loading: boolean = false;
  searchedCity: string | any = null;

  constructor() {
    super(Weather.key);
    makeObservable(this, {
      loading: observable,
      favoriteCities: observable,
      cityWeather: observable,
      searchResults: observable,
      searchedCity: observable,
      favCityNames: computed,
      fetchCityWeather: action,
      addFavoriteCity: action,
      removeFavoriteCity: action,
      addNote: action,
      updateNote: action,
      removeNote: action,
      load: action,
      setCityWeather: action,
      setFavoriteCities: action,
      setSearchResults: action,
      searchCities: action,
    });
  }

  appStore = this.getStore("app");

  load = async () => {
    const storageFavCities = this.retrieveFavoriteCities();
    const jsonFavCities = require(`./data/favoriteCities.json`);
    const favoriteCities = isEmptyValue(storageFavCities)
      ? jsonFavCities
      : storageFavCities;
    this.setFavoriteCities(favoriteCities);
  };

  setCityWeather = (cityWeather: IWeatherStore["cityWeather"]) => {
    this.cityWeather = cityWeather;
  };

  setSearchResults = (searchResults: IWeatherStore["searchResults"]) => {
    this.searchResults = this.sorted(searchResults);
  };

  setFavoriteCities = (favCities: Array<FavoriteCity>) => {
    this.favoriteCities = this.sorted(favCities);
  };

  get favCityNames() {
    return this.favoriteCities.map((fc) => genKey(fc));
  }

  getGeoLocation = () => {
    // https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API/Using_the_Geolocation_API
    if ("geolocation" in navigator) {
      return new Promise((resolve) => {
        navigator.geolocation.getCurrentPosition(
          ({ coords }) => resolve(coords),
          (e) => {
            const alert = { content: e.message, status: "error" };
            this.appStore.setAlert(alert);
            resolve(null);
          }
        );
      });
    } else {
      // Geolocation is not supported by your browser
      const alert = {
        content: "Geolocation is not supported by your browser",
        status: "error",
      };
      this.appStore.setAlert(alert);
    }
  };

  sorted = (cities: Array<FavoriteCity>) => {
    return cities
      .sort((a, b) => {
        return genKey(a).localeCompare(genKey(b));
      })
      .map((city: FavoriteCity) => {
        return { ...city, key: genKey(city) };
      });
  };

  addFavoriteCity = (city: FavoriteCity) => {
    const index = this.favCityNames.indexOf(genKey(city));
    const storeCity = this.favoriteCities[index] || {};
    city.isFavorite = true;

    if (genKey(storeCity) === genKey(city)) {
      runInAction(() => {
        this.favoriteCities[index] = city;
      });
    } else {
      const favCities = [...this.favoriteCities, city];
      this.setFavoriteCities(favCities);
    }
    this.commitFavoriteCities();
    this.appStore.setAlert({
      content: `"${genKey(city, " - ")}" added to favorite`,
    });
  };

  removeFavoriteCity = (city: FavoriteCity) => {
    const index = this.favCityNames.indexOf(genKey(city));
    if (index >= 0) {
      runInAction(() => {
        this.favoriteCities[index] = { ...city, isFavorite: false };
      });
    }
    this.commitFavoriteCities();
    this.appStore.setAlert({
      content: `"${genKey(city, " - ")}" removed from favorite`,
    });
  };

  commitFavoriteCities = () => {
    /* commit favorite cities to localStorage */

    const favoriteCities = this.favoriteCities.filter(({ isFavorite }) => {
      return isFavorite === true;
    });
    if (isEmptyValue(favoriteCities)) {
      return;
    }
    localStorage.setItem("favoriteCities", JSON.stringify(favoriteCities));
  };

  retrieveFavoriteCities = () => {
    /* retrieve favorite cities from localStorage */

    const favCities = localStorage.getItem("favoriteCities");
    if (favCities) {
      return JSON.parse(favCities);
    }
    return null;
  };

  commitCitiesWeather = () => {
    /* commit city weather to localStorage */

    const key = genKey(this.cityWeather?.location ?? {});

    // commit changes when city exist.
    if (!key) {
      return;
    }

    const parse = JSON.parse.bind(JSON);
    const stringify = JSON.stringify.bind(JSON);

    // default value if no data is found in the localStorage
    const noData = "{}";

    // cities weather saved in the localStorage
    const citiesWeather = parse(
      localStorage.getItem("citiesWeather") || noData
    );

    // cities weather creation order saved in the localStorage.
    const citiesWeatherCreationOrder = parse(
      localStorage.getItem("citiesWeatherCreationOrder") || noData
    );
    let creationOrders: Array<[string, number]> = Object.entries(
      citiesWeatherCreationOrder
    );

    // We keep track of the time a city weather is added to the localStorage,
    // making sure that only 10 weather data are cached. On adding a new weather data
    // after the limit (10) is reached, we remove the oldest weather info from the cache.
    if (creationOrders.length >= 10) {
      creationOrders = creationOrders.sort(([, a], [, b]) => a - b);

      // oldest weather (city name)
      const [key] = creationOrders.slice(-1);

      // removing oldest city weather data from the cache
      // @ts-ignore
      delete citiesWeather[key];

      // removing oldest city name data from the creation order
      // @ts-ignore
      delete citiesWeatherCreationOrder[key];
    }

    // update weather cache with city weather
    // @ts-ignore
    citiesWeather[key] = this.cityWeather;

    // update order cache with added time
    // @ts-ignore
    citiesWeatherCreationOrder[key] = Date.now();

    localStorage.setItem("citiesWeather", stringify(citiesWeather));
    localStorage.setItem(
      "citiesWeatherCreationOrder",
      stringify(citiesWeatherCreationOrder)
    );
  };

  retrieveCitiesWeather = () => {
    /* retrieve city weather from localStorage */

    const cityWeather = localStorage.getItem("citiesWeather");
    if (cityWeather) {
      return JSON.parse(cityWeather);
    }
    return null;
  };

  addNote = (note: string) => {
    if (this.cityWeather?.notes) {
      this.cityWeather?.notes.push(note);
      this.commitCitiesWeather();
      this.appStore.setAlert({ content: "Note added!" });
    }
  };

  updateNote = (note: string, index: number) => {
    if (!isEmptyValue(this.cityWeather?.notes)) {
      this.cityWeather.notes[index] = note;
      this.commitCitiesWeather();
      this.appStore.setAlert({ content: "Note updated!" });
    }
  };

  removeNote = (index: number) => {
    const handleDeleteNote = () => {
      let { notes } = this.cityWeather;
      if (notes?.length) {
        if (index > 0) {
          notes = notes.slice(0, index).concat(notes.slice(index + 1));
        } else {
          notes = notes.slice(index + 1);
        }
        runInAction(() => {
          this.cityWeather.notes = notes;
        });
        this.commitCitiesWeather();
        this.appStore.setAlert({ content: "Note removed!" });
      }
    };

    const dialog = {
      title: "Delete note",
      content: "are you sure?",
      actions: [
        {
          label: "Yes",
          onClick: handleDeleteNote,
        },
      ],
    };

    this.appStore.setDialog(dialog);
  };

  getCachedCityWeather = (key: string) => {
    /* Previously cached weather data */

    let citiesWeather = this.retrieveCitiesWeather();
    return !isEmptyValue(citiesWeather) ? citiesWeather[key] : {};
  };

  fetchCityWeather = async (locOrCity: string) => {
    try {
      const { data } = await this.api.get("/current", { query: locOrCity });
      if (data.success !== false) {
        const key = genKey(data.location);
        const notes = this.getCachedCityWeather(key)?.notes || [];
        this.setCityWeather({ ...data, notes });
      } else {
        this.appStore.setAlert({
          content: data.error?.info,
          status: "error",
        });
      }
    } catch (e) {
      // using previously cached weather data on error
      const key = locOrCity.split(",").join("");
      this.setCityWeather(this.getCachedCityWeather(key) || {});
      this.appStore.setAlert({
        content: "Recent weather data couldn't be fetched!",
        status: "error",
      });
    }
    return this.cityWeather;
  };

  searchCities = async (cityName: string) => {
    this.searchedCity = cityName;

    const setLoading = (loading: boolean = true) => {
      runInAction(() => {
        this.loading = loading;
      });
    };

    try {
      setLoading();
      const { data } = await this.api.get("/autocomplete", { query: cityName });
      if (data.success !== false) {
        this.setSearchResults(data.results);
      } else {
        this.appStore.setAlert({
          content: data.error?.info,
          status: "error",
        });
      }
    } catch (e) {
      this.appStore.setAlert({
        content: `Failed to retrieve results for "${cityName}"!`,
        status: "error",
      });
    } finally {
      setLoading(false);
    }
    return this.searchResults;
  };
}
