import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import PrivateRoute from "./PrivateRoute";

import App from "../components/App";
import Profile from "../components/Profile";
import Vote from "../components/Vote";
import Browse from "../components/Browse";
import TopBridges from "../components/TopBridges";
import Contribute from "../components/Contribute";

const history = createBrowserHistory();

const AppRouter = () => {
  return (
    <BrowserRouter history={history} >
      <Switch>
        <PrivateRoute path="/vote" component={Vote} />
        <PrivateRoute path="/browse" component={Browse} />
        <PrivateRoute path="/top_bridges" component={TopBridges} />
        <Route path="/contribute" component={Contribute} />
        <PrivateRoute path="/profile" component={Profile} />
        <Route path="/" component={App} />
      </Switch>
    </BrowserRouter>
  );
}

export default AppRouter;