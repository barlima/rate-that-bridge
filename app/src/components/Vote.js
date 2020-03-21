import React, { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import withMenu from './Menu/withMenu';
import get from 'lodash/get';
import chunk from 'lodash/chunk';
import shuffle from 'lodash/shuffle';
import { Link } from 'react-router-dom';
import VotePair from './VotePair';

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
  const [ currentPair, setCurrentPair ] = useState([]);
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

    if(pairs.length === 0) {
      const paired = chunk(shuffle(bridges), 2);
      const chunkedPairs = paired.filter(pair => pair.length === 2);
      setCurrentPair(chunkedPairs.pop());
      setPairs(chunkedPairs);
    }
  }, [data]);

  const voteOn = async bridgeId => {
    try {
      await vote({ variables: { bridgeId }});
      setCurrentPair(pairs.pop());
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className="vote">
      <div className="vote__title">Vote now!</div>

      {
        currentPair && currentPair.length === 2 ? (
          <VotePair
            pair={currentPair} 
            voteOn={id => voteOn(id)}
          />
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