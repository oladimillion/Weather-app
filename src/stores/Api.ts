import axios from "axios";
import { Store } from "./Store";

export class Api extends Store {
  static key = "api";

  constructor() {
    super(Api.key);
  }

  get baseURL() {
    return process.env.WEATHER_URI;
  }

  axios = (
    args = {} as { url: string; method: string; params?: object; }
  ) => {
    // @ts-ignore
    return axios({
      ...args,
      baseURL: this.baseURL,
      params: {
        ...args?.params,
        access_key: process.env.WEATHER_API_KEY,
      },
    });
  };

  get = (url: string, params: object = {}, method = "get" as string) => {
    return this.axios({ method, url, params });
  };

}
