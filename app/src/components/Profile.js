import React, { useContext } from 'react';
import withMenu from './Menu/withMenu';
import UserContext from '../context/userContext';
import { Link } from 'react-router-dom';

const Profile = () => {
  const [ user ] = useContext(UserContext);

  return (
    <div className="profile">
      <span>{ user.firstName } { user.lastName }</span>
      <span>{ user.email }</span>

      {
        user.admin && (
          <div>
            <Link to="/admin">Admin Panel</Link>
          </div>
        )
      }
    </div>
  )
}

export default withMenu(Profile);