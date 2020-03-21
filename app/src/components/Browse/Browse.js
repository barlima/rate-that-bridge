import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import get from 'lodash/get';
import { withRouter } from 'react-router-dom';
import withMenu from '../Menu/withMenu';
import { getPaginatedItems } from '../../helpers/common';
import { filterBridges } from '../../helpers/browse';
import Pagination from '../Common/Pagination';
import Loading from '../Common/Loading';

const BRIDGES = gql`
  query getBridges {
    bridges {
      id
      name
      city
      country
      year
      votes {
        id
      }
    }
  }
`;

const PER_PAGE = 9;

const Browse = ({ location }) => {
  const { loading, error, data } = useQuery(BRIDGES);
  const [ selected, setSelected ] = useState();
  const [ previous, setPrevious ] = useState();
  const [ search, setSearch ] = useState();

  const handleClick = id => {
    if (selected === id) {
      setPrevious(id)
      return setSelected()
    }

    setPrevious(selected)
    setSelected(id)
  }

  if (loading) {
    return <Loading />;
  }

  const bridges = get(data, "bridges", []);
  const filteredBridges = filterBridges(bridges, search);
  const paginated = getPaginatedItems(filteredBridges, PER_PAGE);
  const pages = paginated.length;
  const params = new URLSearchParams(location.search);
  const page = params.get('page') || 1;

  return (
    <>
      <div className="browse__search">
        <input
          type="text"
          placeholder="search"
          className="browse__search-input"
          onChange={e => setSearch(e.target.value)}
          defaultValue={search}
        />
      </div>
      <div className="browse">
        {
          paginated.length > 0 ? (
            paginated[page - 1].map(bridge => (
              <div key={bridge.id} className="browse__item" onClick={() => handleClick(bridge.id)}>
                <span className="browse__item-name">
                  {bridge.name}
                </span>
                <span className="browse__item-city">
                  {`${bridge.city} (${bridge.country})`}
                </span>
                <span className="browse__item-year">
                  { bridge.year }
                </span>
                {
                  <div className={`browse__item-more ${bridge.id === selected ? 'show' : ''} ${bridge.id === previous ? 'hide' : ''}`}>
                    <div className="browse__item-more-votes">
                      <span>Votes</span>
                      <span>{bridge.votes ? bridge.votes.length : 0}</span>
                    </div>
                  </div>
                }
              </div>
            ))
          ) : (
            <div className="browse__empty">I'm sorry. The are no bridges.</div>
          )
        }
      </div>
      <div className="browse__pagination">
        {
          pages > 1 && <Pagination pages={pages} />
        }
      </div>
    </>
  )
}

export default withMenu(withRouter(Browse));