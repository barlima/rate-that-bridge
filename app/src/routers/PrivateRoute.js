import React from 'react';
import withUser from  '../components/withUser';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = props => {
  const { user } = props;

  if (!user.id) {
    return <Redirect to="/" />
  }

  return <Route {...props} />
}

export default withUser(PrivateRoute);