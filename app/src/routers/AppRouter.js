import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";

import App from "../components/App";
import Profile from "../components/Profile";

const history = createBrowserHistory();

const AppRouter = () => {
  return (
    <BrowserRouter history={history} >
      <Switch>
        <Route path="/profile" component={Profile} />
        <Route path="/" component={App} />
      </Switch>
    </BrowserRouter>
  );
}

export default AppRouter;