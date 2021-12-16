import React from "react";
import ReactDOM from "react-dom";
import { compose } from "lodash/fp";

import { withStores, withTheme, withLayout, withBrowserRouter } from "./hoc";
import { Routes } from "./Routes";
import "./index.css";

const App = compose(
  withBrowserRouter,
  withStores(),
  withTheme(),
  withLayout()
)(Routes);

ReactDOM.render(<App />, document.getElementById("root"));
