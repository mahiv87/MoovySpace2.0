import React from 'react';
import './nav.css';
import { Link } from 'react-router-dom';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SavedSearchOutlinedIcon from '@mui/icons-material/SavedSearchOutlined';
import DynamicFeedOutlinedIcon from '@mui/icons-material/DynamicFeedOutlined';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';

const Nav = () => {
  return (
    <nav>
      <>
        <Link id="landingPage-btn" to="/">
          <HomeOutlinedIcon />
        </Link>
        <Link id="homePage-btn" to="/home">
          <SavedSearchOutlinedIcon />
        </Link>
        <Link id="feed-btn" to="/feed">
          <DynamicFeedOutlinedIcon />
        </Link>
        <Link id="profile-btn" to="/profile">
          <AccountBoxOutlinedIcon />
        </Link>
      </>
    </nav>
  );
};

export default Nav;
