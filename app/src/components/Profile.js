import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import moment from 'moment';
import withMenu from './Menu/withMenu';
import UserContext from '../context/userContext';
import { Link } from 'react-router-dom';
import get from 'lodash/get';
import { getRecentlyVoted, getFavoriteBridge } from '../helpers/profile';

const VOTES = gql`
  query getMyVotes {
    myVotes {
      id
      created
      bridge {
        name
      }
    }
  }
`

const Profile = () => {
  const [ user ] = useContext(UserContext);
  const { lodaing, error, data } = useQuery(VOTES, {
    fetchPolicy: "network-only"
  });

  const logout = async () => {
    const res = await fetch(`/auth/logout`, { method: 'post' });
    window.location.reload();
  }

  const votes = get(data, "myVotes", []);
  const recentlyVoted = getRecentlyVoted(votes);
  const favorite = getFavoriteBridge(votes);

  return (
    <div className="profile">
      <div>
        <div className="profile__user-data">
          {
            (user.firstName || user.lastName) && (
              <span>{ user.firstName } { user.lastName }</span>
            )
          }
          <span className="profile__user-data-email">{ user.email }</span>
        </div>

        <div className="profile__votes">Votes: {votes.length}</div>

        {
          user.admin && (
            <Link to="/admin">
              <div className="profile__button">
                Admin Panel
              </div>
            </Link>
          )
        }

        <div onClick={logout} className="profile__button">
          Logout
        </div>
      </div>

      <div className="profile__recently-voted">
        <div className="profile__recently-voted-title">
          Recently voted bridges
        </div>

        <div className="profile__recently-voted-items">
          {
            recentlyVoted.length > 0 ? (
              recentlyVoted.map(vote => (
                <div key={vote.id} className="profile__recently-voted-item">
                  <span>{ vote.bridge.name }</span>
                  <span className="profile__recently-voted-date">
                    { moment(vote.created).fromNow() }
                  </span>
                </div>
              ))
            ) : (
              <span className="profile__no-votes">You haven't voted yet</span>
            )
          }
        </div>

        {
          favorite && favorite.name && (
            <div className="profile__favorite-bridge">
              <div className="profile__favorite-title">
                Favorite bridge
              </div>

              <div className="profile__recently-voted-item">
                <span>{ favorite?.name }</span>
                <span className="profile__recently-voted-date">
                  { favorite?.value }
                </span>
              </div>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default withMenu(Profile);