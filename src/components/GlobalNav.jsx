import React from 'react';
import GlobalNavLink from './GlobalNavLink';
import './GlobalNav.scss';

const GlobalNav = () => (
  <nav className="GlobalNav">
    <ul className="GlobalNav__list">
      <li className="GlobalNav__item">
        <GlobalNavLink to="/search">Search</GlobalNavLink>
      </li>
    </ul>
  </nav>
);

export default GlobalNav;
