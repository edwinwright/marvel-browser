// Import CSS
import '../styles/PageFooter.scss';

// Import JS
import React from 'react';
import { VERSION } from 'config/constants';

const PageFooter = () => (
	<footer className="PageFooter">
    <div className="inner container">
      <div className="PageFooter__version">{VERSION}</div>
    </div>
	</footer>
);

export default PageFooter;
