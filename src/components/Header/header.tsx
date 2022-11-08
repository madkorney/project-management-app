import React from 'react';
import { Link } from 'react-router-dom';

import './header.scss';

const Header = () => {
  return (
    <div className="header-container">
      <p>Header - Nav - Profile</p>
      <div>
        <nav className="nav-bar">
          <ul className="nav-list">
            <li>
              <Link to="/">main</Link>
            </li>

            <li>
              <Link to="about">about</Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Header;
