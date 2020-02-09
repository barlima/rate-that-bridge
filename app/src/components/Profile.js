import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import withMenu from './Menu/withMenu';

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
`

const Profile = () => {
  const { loading, error, data } = useQuery(BRIDGES);

  return (
    <div>
      Profile
    </div>
  )
}

export default withMenu(Profile);