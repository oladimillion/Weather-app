import { Api } from "./Api";
import { App } from "./App";
import { Navigation } from "./Navigation";
import { Weather } from "./Weather";

export const appStore = new App();
export const navigationStore = new Navigation();
export const apiStore = new Api();
export const weatherStore = new Weather();
