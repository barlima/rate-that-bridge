import React from 'react';
import { Link } from 'react-router-dom';
import BridgesToVerify from './BridgesToVerify';
import Info from './Info';

const Admin = () => {
  return (
    <div className="secondary-background admin">
      <div className="contribute__back">
        <Link to="/profile"><span>{"<"}</span> Back to Profile</Link>
      </div>
      <span className="admin__title">Admin Panel</span>
      <div className="admin__wrapper">
        <Info />
        <BridgesToVerify />
      </div>
    </div>
  )
}

export default Admin;