import React, { PropTypes } from 'react';
import PageHeader from '../components/PageHeader';
import PageFooter from '../components/PageFooter';

const PageLayout = ({ children }) => (
  <div className="PageLayout">
    <PageHeader />
    <main className="PageBody">
		  {children}
    </main>
    <PageFooter />
  </div>
);

PageLayout.propTypes = {
  children: PropTypes.element.isRequired
}

export default PageLayout;
