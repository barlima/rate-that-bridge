import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroller';
import Loading from '../Common/Loading';
import get from 'lodash/get';

const MORE = 5;
const BRIDGES = gql`
  query getBridges {
    bridges {
      id
      name
      city
      country
      pictureUrl
      year
    }
  }
`;

const BridgesList = () => {
  const { loading, error, data } = useQuery(BRIDGES);
  const [ bridges, setBridges ] = useState([]);
  const [ loadedBridges, setLoadedBridges ] = useState([]);

  const loadMore = () => setLoadedBridges(bridges.slice(0, loadedBridges.length + MORE));
  const hasMore = () => bridges.length > loadedBridges.length;

  useEffect(() => {
    if (!loading) {
      const bridgesData = get(data, "bridges", []);
      setBridges(bridgesData);
      setLoadedBridges(bridgesData.slice(0, MORE));
    }
  }, [data]);

  return (
    <div className="bridges" >
      <div className="about__back">
        <Link to="/"><span>{"<"}</span> Back</Link>
      </div>
      <h1 className="bridges__title">All available bridges</h1>
      <InfiniteScroll
        pageStart={0}
        loadMore={loadMore}
        hasMore={hasMore()}
        loader={<Loading key="loading"/>}
      >
        <div className="bridges__items">
          {
            loadedBridges.map(bridge => (
              <Link 
                key={bridge.id}
                to={`/bridges/${bridge.id}`}
                className="bridges__link"
              >
                <div className="bridges__item">
                  <div className="bridges__item-data">
                    <span className="bridges__item-title">{bridge.name}</span>
                    <span className="bridges__item-subtitle">
                      {bridge.country} ({bridge.city})
                    </span>
                    <span className="bridges__item-subtitle">{bridge.year}</span>
                  </div>
                  <div className="bridges__item-img">
                    <img src={bridge.pictureUrl} alt={bridge.name} />
                  </div>
                </div>
              </Link>
            ))
          }
        </div>
      </InfiniteScroll>
    </div>
  )
}

export default BridgesList;