import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import Loading from '../Common/Loading';
import get from 'lodash/get';

const STATS = gql`
  query getStats {
    stats {
      bridges
      votes
      users
    }
  }
`

const Info = () => {
  const { loading, errors, data } = useQuery(STATS);

  const users = get(data, "stats.users");
  const bridges = get(data, "stats.bridges");
  const votes = get(data, "stats.votes");

  return (
    <div className="admin__info">
      <div className="admin__info-header">
        Application stats
      </div>

      {
        loading ? (
          <Loading />
        ) : (
          <div className="admin__info-stats">
            <div className="admin__info-stat">
              <span>Users: </span><span>{users}</span>
            </div>
            <div className="admin__info-stat">
              <span>Bridges: </span><span>{bridges}</span>
            </div>
            <div className="admin__info-stat">
              <span>Votes: </span><span>{votes}</span>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default Info;