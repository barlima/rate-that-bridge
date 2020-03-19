import React from 'react';
import { withRouter } from 'react-router-dom';
import withMenu from '../Menu/withMenu';
import {
  TODAY,
  THIS_WEEK,
  THIS_MONTH,
  ALL_TIME,
} from '../../helpers/top-bridges';
import TopBridgesList from './TopBridgesList';

const TopBridges = props => {
  const { location, history } = props;
  const params = new URLSearchParams(location.search);
  const tab = params.get('tab');

  const setTab = param => {
    if (param === TODAY) {
      return history.replace(location.pathname);
    }

    history.replace({
      pathname: location.pathname,
      search: `?tab=${param}`
    });
  }

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
          <TopBridgesList tab={tab} />
        </div>
      </div>
    </div>
  )
}

export default withMenu(withRouter(TopBridges));