import React from 'react';
import Modal from '../Common/Modal';

const BridgeModal = ({ bridge, close, confirm }) => {

  const handleConfirm = () => {
    confirm();
    close()
  }

  return (
    <Modal>
      <div className="admin__bridge-modal">
        <img src={bridge.pictureUrl} />
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
          onClick={close}
        >
          Close
        </button>
      </div>
    </Modal>
  )
}

export default BridgeModal;