import React, { PropTypes } from 'react';
import PageHeader from 'features/header';
import PageFooter from 'features/footer';

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
