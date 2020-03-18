import React from 'react';
import Modal from '../Common/Modal';

const BridgeModal = ({ bridge, close, confirm, reject }) => {

  const handleConfirm = () => {
    confirm();
    close()
  }

  const handleReject = () => {
    reject();
    close();
  }

  return (
    <Modal>
      <div className="admin__bridge-modal">
        <img src={bridge.pictureUrl} alt={bridge.name}/>
        <span className="admin__bridge-modal-name">{bridge.name}</span>
        <span className="admin__bridge-modal-city">{bridge.city} ({bridge.country})</span>
        <span className="admin__bridge-modal-year">{bridge.year}</span>
        <button
          className="admin__bridge-modal-button"
          onClick={handleConfirm}
        >
          Confirm
        </button>
        <button
          className="admin__bridge-modal-button"
          onClick={handleReject}
        >
          Reject
        </button>
        <button
          className="admin__bridge-modal-button"
          onClick={close}
        >
          Close
        </button>
      </div>
    </Modal>
  )
}

export default BridgeModal;