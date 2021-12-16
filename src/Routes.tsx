// @ts-nocheck
import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { withLoadRoutes } from "./hoc/withLoadRoutes";

const Weather = React.lazy(() => import("./views/Weather"));
const Favorites = React.lazy(() => import("./views/Favorites"));
const SearchResult = React.lazy(() => import("./views/SearchResult"));

export const Routes = withLoadRoutes(() => (
  <Switch>
    <Route path="/" exact component={Favorites} />
    <Route path="/weather" exact component={Weather} />
    <Route path="/search" exact component={SearchResult} />
    <Redirect from="*" to="/" />
  </Switch>
));
