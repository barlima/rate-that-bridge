import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="header">
      <div className="header__options">
        <Link to="/vote" className="header__option">Vote</Link>
        <Link to="/browse" className="header__option">Browse</Link>
        <Link to="/top_bridges" className="header__option">Top Bridges</Link>
        <Link to="/contribute" className="header__option">Contribute</Link>
      </div>
      <Link to="/profile" className="header__option">Profile</Link>
    </div>
  )
}

export default Header;