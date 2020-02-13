import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import withMenu from './Menu/withMenu';
import UserContext from '../context/userContext';
import { Link } from 'react-router-dom';
import get from 'lodash/get';

const VOTES = gql`
  query getMyVotes {
    myVotes {
      id
    }
  }
`

const Profile = () => {
  const [ user ] = useContext(UserContext);
  const { lodaing, error, data } = useQuery(VOTES, {
    fetchPolicy: "network-only"
  });

  const votes = get(data, "myVotes", []);

  return (
    <div className="profile">
      <div className="profile__user-data">
        <span>{ user.firstName } { user.lastName }</span>
        <span className="profile__user-data-email">{ user.email }</span>
      </div>

      <div className="profile__votes">Votes: {votes.length}</div>

      {
        user.admin && (
          <div className="profile__button">
            <Link to="/admin">Admin Panel</Link>
          </div>
        )
      }
    </div>
  )
}

export default withMenu(Profile);