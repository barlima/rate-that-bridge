import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";

import App from "../components/App";
import Profile from "../components/Profile";
import Vote from "../components/Vote";
import Browse from "../components/Browse";
import TopBridges from "../components/TopBridges";
import Contribute from "../components/Contribute";
import Admin from "../components/Admin/Admin";

const history = createBrowserHistory();

const AppRouter = () => {
  return (
    <Router history={history} >
      <Switch>
        <PrivateRoute path="/vote" component={Vote} />
        <PrivateRoute path="/browse" component={Browse} />
        <PrivateRoute path="/top_bridges" component={TopBridges} />
        <Route path="/contribute" component={Contribute} />
        <PrivateRoute path="/profile" component={Profile} />
        <AdminRoute path="/admin" component={Admin} />
        <Route path="/" component={App} />
      </Switch>
    </Router>
  );
}

export default AppRouter;