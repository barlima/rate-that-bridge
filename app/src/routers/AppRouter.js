import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";

import App from "../components/App";
import Profile from "../components/Profile";
import Vote from "../components/Vote";
import Browse from "../components/Browse/Browse";
import BridgesList from "../components/Browse/BridgesList";
import Bridge from "../components/Browse/Bridge";
import TopBridges from "../components/TopBridges/TopBridges";
import Contribute from "../components/Contribute";
import Admin from "../components/Admin/Admin";
import About from "../components/About";
import SignUp from "../components/Auth/SignUp";
import SignIn from "../components/Auth/SignIn";

const history = createBrowserHistory();

const AppRouter = () => {
  return (
    <Router history={history} >
      <Switch>
        <PrivateRoute path="/vote" component={Vote} />
        <PrivateRoute path="/browse" component={Browse} />
        <PrivateRoute path="/top_bridges" component={TopBridges} />
        <PrivateRoute path="/profile" component={Profile} />
        <AdminRoute path="/admin" component={Admin} />
        <Route path="/signup" component={SignUp} />
        <Route path="/signin" component={SignIn} />
        <Route path="/contribute" component={Contribute} />
        <Route path="/about" component={About} />
        <Route path="/bridges" component={BridgesList} exact />
        <Route path="/bridges/:id" component={Bridge} />
        <Route path="/" component={App} />
      </Switch>
    </Router>
  );
}

export default AppRouter;