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
        <Link to="/">
          <HomeOutlinedIcon />
        </Link>
        <Link to="/home">
          <SavedSearchOutlinedIcon />
        </Link>
        <Link to="/feed">
          <DynamicFeedOutlinedIcon />
        </Link>
        <Link to="/profile">
          <AccountBoxOutlinedIcon />
        </Link>
      </>
    </nav>
  );
};

export default Nav;
