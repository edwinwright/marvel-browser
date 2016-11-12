import React, { PropTypes } from 'react';
import PageHeader from '../components/PageHeader';
import PageFooter from '../components/PageFooter';

const propTypes = {
  children: PropTypes.element.isRequired,
};

const defaultProps = {};

const App = ({ children }) => (
  <div className="App">
    <PageHeader />
    <main className="PageBody">
      {children}
    </main>
    <PageFooter />
  </div>
);

App.propTypes = propTypes;
App.defaultProps = defaultProps;

export default App;
