import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { withRouter } from 'react-router-dom';
import get from 'lodash/get';
import withMenu from './Menu/withMenu';
import {
  TODAY,
  THIS_WEEK,
  THIS_MONTH,
  ALL_TIME,
  getPeriod
} from '../helpers/top-bridges';

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

const TopBridges = props => {
  const { location, history } = props;
  const params = new URLSearchParams(location.search);
  const tab = params.get('tab');
  const tabKind = tab ? tab.split('_').join(' ') : 'today';
  
  const { loading, error, data } = useQuery(TOP_BRIDGES, {
    variables: {
      period: getPeriod(tab)
    },
    fetchPolicy: "network-only"
  });

  const setTab = param => {
    if (param === TODAY) {
      return history.replace(location.pathname);
    }

    history.replace({
      pathname: location.pathname,
      search: `?tab=${param}`
    });
  }

  const topBridges = get(data, "topBridges") || [];

  return (
    <div className="top-bridges">
      <div className="top-bridges__tabs">
        <div className={`top-bridges__tab ${!tab ? 'active' : ''}`} onClick={() => setTab(TODAY)}>Today</div>
        <div className={`top-bridges__tab ${tab === THIS_WEEK ? 'active' : ''}`} onClick={() => setTab(THIS_WEEK)} >This week</div>
        <div className={`top-bridges__tab ${tab === THIS_MONTH ? 'active' : ''}`} onClick={() => setTab(THIS_MONTH)} >This month</div>
        <div className={`top-bridges__tab ${tab === ALL_TIME ? 'active' : ''}`} onClick={() => setTab(ALL_TIME)} >All time</div>
      </div>

      <div className="top-bridges__list">
        <div className="top-bridges__list-title">
          Top 5 Brigdes
        </div>

        <div className="top-bridges__list-items">
        {
          topBridges.length > 0 ? (
            topBridges.slice(0,5).map((bridge, i) => (
              <div className="top-bridges__list-item">
                <span className="top-bridges__list-item-position">{i+1}</span>
                <span className="top-bridges__list-item-name">{bridge.name}
                  <span className="top-bridges__list-item-city">{`${bridge.city} (${bridge.country})`}</span>
                </span>
                <span className="top-bridges__list-item-votes">{bridge.votes.length}</span>
              </div>
            ))
          ) : (
            <div className="top-bridges__empty">
              {`It seems that no one has voted ${tabKind === 'all time' ? 'yet' : tabKind}.`}
            </div>
          )
        }
        </div>
      </div>
    </div>
  )
}

export default withMenu(withRouter(TopBridges));