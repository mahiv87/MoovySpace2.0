import React from 'react';

const Modal = ({ open, children, onClose }) => {
  if (!open) return null;

  return (
    <div>
      <button onClick={onClose} className="btn btn-block btn-primary">
        Click To Go Back To Login In 🔙{' '}
      </button>
      {children}
    </div>
  );
};

export default Modal;
