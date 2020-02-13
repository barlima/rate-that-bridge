import React from 'react';

const Modal = ({ children }) => {
  return (
    <div className="modal">
      <div className="modal__container">
        { children }
      </div>
    </div>
  )
}

export default Modal;