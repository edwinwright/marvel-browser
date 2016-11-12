import './PageHeader.scss';
import React from 'react';
import { Link } from 'react-router';
import GlobalNav from './GlobalNav';

const PageHeader = () => (
	<header className="PageHeader">
    <div className="inner container">
      <Link className="PageHeader__logo" to="/">Marvel API Browser</Link>
      <div className="PageHeader__nav">
        <GlobalNav />
      </div>
    </div>
	</header>
);

export default PageHeader;
