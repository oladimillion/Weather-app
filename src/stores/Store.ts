import { toJS } from "mobx";
import { toJS as deepToJS } from "../helpers";
import { IStore } from "./types";

const memo: any = {};

export class Store implements IStore {
  constructor(key: string) {
    memo[key] = this;
  }

  __dev__ = process.env.NODE_ENV === "development";

  get api() {
    return this.getStore("api");
  }

  static getStore = (key: string) => memo[key];
  
  getStore = (key: string) => {
    return Store.getStore(key);
  };

  static getAllStore = () => memo;

  deepToJS = (data = this): object => deepToJS(data);

  toJS = (data = this): object => toJS(data);
}
