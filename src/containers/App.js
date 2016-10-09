import React, { PropTypes } from 'react';
import PageHeader from '../components/PageHeader';
import PageFooter from '../components/PageFooter';

const App = ({ children }) => (
  <div className="App">
    <PageHeader />
    <main className="PageBody">
		  {children}
    </main>
    <PageFooter />
  </div>
);

App.propTypes = {
  children: PropTypes.element.isRequired
}

export default App;
