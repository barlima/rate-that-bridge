import React, { useContext, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import get from 'lodash/get';
import UserContext from '../context/userContext';
import { setUser } from '../reducers/user';

const CURRENT_USER = gql`
  query getCurrentUser {
    me {
      id
      email
      firstName
      lastName
    } 
  }
`;

const withUser = WrappedComponent => {
  const MenuWrapper = props => {
    const [ currentUser, dispatch ] = useContext(UserContext);
    const { loading, error, data } = useQuery(CURRENT_USER, {
      skip: !!currentUser.id
    });

    if (currentUser.id) {
      return <WrappedComponent {...props} user={currentUser} />
    }

    if (loading) {
      return 'Loading...';
    }

    const user = get(data, "me", {});

    dispatch(
      setUser({
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
      })
    );

    return (
      <WrappedComponent {...props} user={user} />
    )
  }

  return MenuWrapper;
}

export default withUser;