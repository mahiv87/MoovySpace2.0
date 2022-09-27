import './homepage.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Login from '../Login/Login';
import Signup from '../Signup/Signup';
import Modal from '../Modal/Modal';

import Auth from '../../utils/auth';

const BUTTON_WRAPPER_STYLES = {
  position: 'relative',
  zIndex: 1,
};

const HomePage = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  const [isOpen, setIsOpen] = useState(false);
  const [hide, setHide] = useState(false);

  return (
    <>
      <div className="split left">
        <div className="centered">
          <img
            src="https://i.ytimg.com/vi/FgOogVddW2I/maxresdefault.jpg"
            alt="Movies"
            className=""
          />
          <h2 className="cinema"> What is your favorite movie? 🎥 </h2>
          <p></p>
        </div>
      </div>

      <div className="split right">
        <div className="centered">
          <div>
            {Auth.loggedIn() ? (
              <>
                <Link className="btn btn-lg btn-info m-2" to="/profile">
                  {Auth.getProfile().data.username}'s profile
                </Link>
                <Link className="btn btn-lg btn-info m-2" to="/home">
                  Homepage
                </Link>
                <p className="btn btn-primary" onClick={logout}>
                  Logout
                </p>
              </>
            ) : (
              <>
                <div style={BUTTON_WRAPPER_STYLES}>
                  {hide === true ? '' : <Login />}
                  <Modal
                    open={isOpen}
                    onClose={() => {
                      setHide(false);
                      setIsOpen(false);
                    }}
                  >
                    <Signup />
                  </Modal>
                  <div className="signUpOne">
                    {hide === true ? (
                      ''
                    ) : (
                      <button
                        className="btn btn-primary "
                        onClick={() => {
                          setHide(true);
                          setIsOpen(true);
                        }}
                      >
                        Signup instead? ✍️
                      </button>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
