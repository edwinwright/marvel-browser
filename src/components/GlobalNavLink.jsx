import React from 'react';
import { Link } from 'react-router';

const GlobalNavLink = props => (
  <Link {...props} className="GlobalNav__link" activeClassName="is-active" />
);

export default GlobalNavLink;
