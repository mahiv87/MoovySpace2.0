import React from 'react';
import { Link } from 'react-router-dom';
import './header.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import Auth from '../../utils/auth';

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <header>
      {Auth.loggedIn() ? (
        <div>
          <label htmlFor="touch">
            <span>
              <AccountCircleIcon id="profilePictureContainer" />
            </span>
          </label>
          <input type="checkbox" id="touch" />
          <ul className="slide">
            <li>
              <Link className="profileLinks" to="/profile">
                Profile
              </Link>
            </li>
            <li>
              <Link className="profileLinks" to="/home">
                Home
              </Link>
            </li>
            <li>
              <Link className="profileLinks" to="/feed">
                Feed
              </Link>
            </li>
            <li>
              {/* Take back to welcome page */}
              <button
                type="button"
                className="profileLinks"
                id="logoutLink"
                onClick={logout}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      ) : (
        <div>
          <label htmlFor="touch">
            <span>
              <AccountCircleIcon id="profilePictureContainer" />{' '}
            </span>
          </label>
          <input type="checkbox" id="touch" />
          <ul className="slide">
            <li>
              <Link className="profileLinks" to="/">
                Login
              </Link>
            </li>
            <li>
              <Link className="profileLinks" to="/">
                Signup
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
