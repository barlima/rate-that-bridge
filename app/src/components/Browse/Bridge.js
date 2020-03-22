import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Link, withRouter } from 'react-router-dom';
import get from 'lodash/get';
import { gql } from 'apollo-boost';
import withUser from '../withUser';
import Header from '../Menu/Header';

const BRIDGE = gql`
  query getBridge($id: Int!) {
    bridge(id: $id) {
      id
      name
      city
      country
      region
      pictureUrl
      url
      year
      votes {
        id
        user {
          id
        }
      }
    }
  }
`;

const BridgeCard = ({ userId, bridge, verbose }) => {
  const votes = get(bridge, "votes") || [];
  const yourVotes = userId
    ? votes.filter(vote => vote.user.id === parseInt(userId))
    : []

  return (
    <div className="bridge">
      <div className="bridge__data">

        <div className="bridge__data-container">
          <span className="bridge__label">Name</span>
          <h1 className="bridge__title">{bridge.name}</h1>
        </div>

        <div className="bridge__data-container">
          <span className="bridge__label">Country</span>
          <span className="bridge__subtitle">
            {bridge.country}
          </span>
        </div>

        <div className="bridge__data-container">
          <span className="bridge__label">City</span>
          <span className="bridge__subtitle">
            {bridge.city}{bridge.region && ` (${bridge.region})`}
          </span>
        </div>
        
        <div className="bridge__data-container">
          <span className="bridge__label">Built</span>
          <span className="bridge__subtitle">{bridge.year}</span>
        </div>
        
        <div className="bridge__data-container">
          <span className="bridge__label">More</span>
          <span className="bridge__subtitle">
            <a href={`${bridge.url}`}>Link</a>
          </span>
        </div>

        {
          verbose ? (
            <>
              <div className="bridge__data-container">
                <span className="bridge__label">Total votes</span>
                <span className="bridge__subtitle">{votes.length}</span>
              </div>

              <div className="bridge__data-container">
                <span className="bridge__label">Your votes</span>
                <span className="bridge__subtitle">{yourVotes.length}</span>
              </div>
            </>
          ) : (
            <div className="bridge__signup">
              <span>
                If you would like to participate in voting, 
                please create an account or login.
              </span>

              <div>
                <Link to="/signin">
                  <button className="primary-button">
                    Login
                  </button>
                </Link>

                <Link to="/signup">
                  <button className="secondary-button">
                    Sign Up
                  </button>
                </Link>
              </div>
            </div>
          )
        }
      </div>

      <div className="bridge__img">
        <img src={bridge.pictureUrl} alt={bridge.name} />
      </div>
    </div>
  )
}

const Bridge = ({ match, user }) => {
  const id = get(match, "params.id");
  const [bridge, setBridge] = useState({});
  const { loading, error, data } = useQuery(BRIDGE, {
    variables: { id: parseInt(id) }
  });

  useEffect(() => {
    if (!loading) {
      const bridgeData = get(data, "bridge");
      setBridge(bridgeData);
    }
  }, [data])

  if (user.id) {
    return (
      <>
        <Header />
        <div className="menu__content">
          <BridgeCard verbose bridge={bridge} userId={user.id} />
        </div>
      </>
    )
  } else {
    return (
      <div className="bridge__background">
        <BridgeCard bridge={bridge} />
      </div>
    )
  }
}

export default withRouter(withUser(Bridge));