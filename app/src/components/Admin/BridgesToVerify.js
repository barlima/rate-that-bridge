import React, { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import get from 'lodash/get';
import Loading from '../Common/Loading';
import BridgeModal from './BridgeModal';

const VERIFY = gql`
  mutation verify($id: Int!) {
    verifyBridge(id: $id)
  }
`

const DELETE = gql`
  mutation delete($id: Int!) {
    deleteBridge(id: $id)
  }
`

const BRIDGES = gql`
  query getBridges($filter: BridgeFilter!) {
    bridges(filter: $filter) {
      id
      name
      city
      country
      year
      pictureUrl
      votes {
        id
      }
    }
  }
`;

const BridgesToVerify = () => {
  const [ verifyBridge ] = useMutation(VERIFY);
  const [ deleteBridge ] = useMutation(DELETE);
  const [ bridges, setBridges ] = useState([]);
  const [ more, setMore ] = useState();
  const { loading, error, data } = useQuery(BRIDGES, {
    skip: bridges.length > 0,
    fetchPolicy: "network-only",
    variables: {
      filter: {
        voted: "ALL",
        verified: false
      }
    }
  });

  useEffect(() => {
    const bridges = get(data, "bridges", []);

    if (bridges.length > 0) {
      setBridges(bridges);
    }
  }, [data])

  const handleConfirm = async id => {
    try {
      await verifyBridge({ variables: { id } });
      setBridges(
        bridges.filter(bridge => bridge.id !== id)
      )
    } catch(e) {
      console.error(e);
    }
  }

  const handleReject = async id => {
    try {
      await deleteBridge({ variables: { id }});
      setBridges(
        bridges.filter(bridge => bridge.id !== id)
      )
    } catch(e) {
      console.error(e);
    }
  }

  if (loading) {
    return <Loading />
  }

  return (
    <div className="admin__new-bridges">
      <div className="admin__new-bridges-header">
        {
          bridges.length > 0 ? (
            <span>
              {`${bridges.length} bridges awaits your confirmation.`}
            </span>
          ) : (
            <span>There are no bridges to approve.</span>
          )
        }
      </div>
      <div className="admin__new-bridges-items">
        { bridges.map(bridge => (
          <div className="admin__new-bridges-item">
            <span className="admin__new-bridges-item-name">{ bridge.name }</span>
            <div>
              <button
                onClick={() => setMore(bridge)}
                className="admin__new-bridges-item-see-more"
              >
                See More
              </button>
              <button
                className="admin__new-bridges-item-button"
                onClick={() => handleConfirm(bridge.id)}
              >
                Confirm
              </button>
              <button
                className="admin__new-bridges-item-button
                  admin__new-bridges-item-button-reject"
                onClick={() => handleReject(bridge.id)}
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
      {
        bridges.length > 0 && <div className="admin__new-bridges-shadow" />
      }
      {
        more && (
          <BridgeModal
            bridge={more}
            close={() => setMore()}
            confirm={() => handleConfirm(more.id)}
            reject={() => handleReject(more.id)}
          />
        )
      }
    </div>
  )
}

export default BridgesToVerify;