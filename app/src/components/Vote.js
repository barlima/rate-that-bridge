import React from 'react';
import withMenu from './Menu/withMenu';

const Vote = () => {
  return (
    <div className="vote">
      <div className="vote__title">Vote now!</div>

      <div className="vote__container">
        <div className="vote__image">
          <img src="https://via.placeholder.com/300" />
        </div>

        <div className="vote__vs">vs</div>

        <div className="vote__image">
          <img src="https://via.placeholder.com/300" />
        </div>
      </div>
    </div>
  )
}

export default withMenu(Vote);