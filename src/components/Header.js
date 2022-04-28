import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
return (
  <header>
    <Link to="/">Home</Link>
    <button>Posts</button>
    <Link to="/profile">Profile</Link>
  </header>
)
};

export default Header;