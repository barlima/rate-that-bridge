import React from 'react';
import withUser from  '../components/withUser';
import { Route, Redirect } from 'react-router-dom';

const AdminRoute = props => {
  const { user } = props;

  if (!user.id) {
    return <Redirect to="/" />
  }

  if (user && !user.admin) {
    return <Redirect to="/profile" />
  }

  return <Route {...props} />
}

export default withUser(AdminRoute);