import { observable, makeObservable, action } from "mobx";
import { Store } from "./Store";
import { INavigationStore } from "./types";

const initialState = {
  navItems: [
    {
      icon: "star",
      name: "Favorites",
      to: "/",
    },
    {
      icon: "cloud",
      name: "Weather",
      to: "/weather",
    },
    {
      icon: "lens",
      name: "Search - Results",
      to: "/search",
    },
  ],
};

export class Navigation extends Store implements INavigationStore {
  static key = "navigation";
  navItems: INavigationStore["navItems"] = initialState.navItems;
  searchRoute: string = this.navItems[2].to;

  constructor() {
    super(Navigation.key);
    makeObservable(this, {
      navItems: observable,
      reset: action,
    });
  }

  reset = () => {
    Object.assign(this, initialState);
  };
}
