import React from 'react';
import { Provider } from 'react-redux';
import Routing from '../config/routing';
import configureStore from '../config/store';

const store = configureStore();

const Root = () => (
  <Provider store={store}>
    {Routing}
  </Provider>
);

export default Root;
