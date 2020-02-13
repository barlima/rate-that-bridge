import React, { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import withMenu from './Menu/withMenu';
import get from 'lodash/get';
import chunk from 'lodash/chunk';
import shuffle from 'lodash/shuffle';
import { Link } from 'react-router-dom';

const BRIDGES = gql`
  query getBridges($filter: BridgeFilter!) {
    bridges(filter: $filter) {
      id
      name
      city
      country
      pictureUrl
    }
  }
`

const VOTE = gql`
  mutation vote($bridgeId: Int!) {
    vote(bridgeId: $bridgeId) {
      id
    }
  }
`

const Vote = () => {
  const [ pairs, setPairs ] = useState([]);
  const [ vote ] = useMutation(VOTE);
  const { loading, error, data } = useQuery(BRIDGES, {
    skip: pairs.length > 0,
    fetchPolicy: "network-only",
    variables: {
      filter: {
        voted: "NOT_VOTED"
      }
    }
  });

  useEffect(() => {
    const bridges = get(data, "bridges", []);

    if (bridges.length === 0) {
      return;
    }

    const paired = chunk(shuffle(bridges), 2);
    setPairs(paired.filter(pair => pair.length === 2));
  }, [data]);

  const voteOn = async bridgeId => {
    try {
      const res = await vote({ variables: { bridgeId }});

      if(res.error) {
        return;
      }

      setPairs(pairs);
    } catch (e) {
      console.error(e);
    }
  }

  const currentPair = pairs.pop();

  return (
    <div className="vote">
      <div className="vote__title">Vote now!</div>

      {
        currentPair && currentPair.length === 2 ? (
          <div className="vote__container">
            <div className="vote__image" onClick={() => voteOn(currentPair[0].id)}>
              <img src={`${currentPair[0].pictureUrl}`} />
            </div>

            <div className="vote__vs">vs</div>

            <div className="vote__image" onClick={() => voteOn(currentPair[1].id)}>
              <img src={`${currentPair[1].pictureUrl}`} />
            </div>
          </div>
        ) : (
          !loading && (
            <div className="vote__no-more">
              <span className="vote__no-more-text">
                Thank you for all your votes!
                <br/>
                There are no more bridges available.
                <br/>
                Come back and vote tomorrow :)
              </span>
              <Link to="/contribute">
                <button className="vote__no-more-button">
                  Add More Bridges
                </button>
              </Link>
            </div>
          )
        )
      }
    </div>
  )
}

export default withMenu(Vote);