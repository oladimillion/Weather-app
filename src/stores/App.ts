import { makeObservable, action, observable } from "mobx";
import { Store } from "./Store";
import { IAppStore } from "./types";

export class App extends Store implements IAppStore {
  static key = "app";

  alert: IAppStore["alert"] = {}
  dialog: IAppStore["dialog"] = {}

  constructor() {
    super(App.key);
    makeObservable(this, {
      alert: observable,
      dialog: observable,
      setDialog: action,
      setAlert: action,
    });
  }

  setDialog = (dialog: IAppStore["dialog"] = {}) => {
    this.dialog = dialog
  };

  setAlert = (alert: IAppStore["alert"] = {}) => {
    this.alert = alert
  };
}
