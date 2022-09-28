import React from 'react';
import './modal.css';

const Modal = ({ open, children, onClose }) => {
  if (!open) return null;

  return (
    <>
      <h2 className="login-moovySpace">MoovySpace</h2>
      <div className="modal__container">
        <h2>Create new account</h2>
        <span>
          Already A Member?{' '}
          <a id="login-btn" onClick={onClose}>
            Login{' '}
          </a>{' '}
        </span>
        {children}
      </div>
    </>
  );
};

export default Modal;
