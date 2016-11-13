import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import routes from '../routes';
import DevTools from './DevTools';

const propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

const Root = ({ store, history }) => (
  <Provider store={store}>
    <div>
      <Router history={history} routes={routes} />
      <DevTools />
    </div>
  </Provider>
);

Root.propTypes = propTypes;

export default Root;
