import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';
import { gql } from 'apollo-boost';
import get from 'lodash/get';
import { ALL_TIME, getPeriod } from '../../helpers/top-bridges';

const TOP_BRIDGES = gql`
  query getTopBridges($period: Period!) {
    topBridges(period: $period) {
      id
      name
      city
      country
      votes {
        id
      }
    }
  }
`

const TopBridgesList = ({ tab }) => {
  const tabKind = tab ? tab.split('_').join(' ') : 'today';
  const { loading, error, data } = useQuery(TOP_BRIDGES, {
    variables: {
      period: getPeriod(tab)
    },
    fetchPolicy: "network-only"
  });

  const topBridges = get(data, "topBridges") || [];

  return topBridges.length > 0 ? (
    topBridges.slice(0,5).map((bridge, i) => (
      <Link to={`/bridges/${bridge.id}`} key={i}>
        <div className="top-bridges__list-item">
          <span className="top-bridges__list-item-position">{i+1}</span>
          <span className="top-bridges__list-item-name">{bridge.name}
            <span className="top-bridges__list-item-city">{`${bridge.city} (${bridge.country})`}</span>
          </span>
          <span className="top-bridges__list-item-votes">{bridge.votes.length}</span>
        </div>
      </Link>
    ))
  ) : (
    <div className="top-bridges__empty">
      {`It seems that no one has voted ${tab === ALL_TIME ? 'yet' : tabKind}.`}
    </div>
  )
}

export default TopBridgesList;