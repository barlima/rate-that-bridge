import React from 'react';

const VotePair = ({ pair, voteOn }) => {
  return (
    <div className="vote__container">
      <div className="vote__image" onClick={() => voteOn(pair[0].id)}>
        <img src={`${pair[0].pictureUrl}`} alt="First bridge image"/>
      </div>

      <div className="vote__vs">vs</div>

      <div className="vote__image" onClick={() => voteOn(pair[1].id)}>
        <img src={`${pair[1].pictureUrl}`} alf="Second bridge image"/>
      </div>
    </div>
  )
}

export default VotePair;