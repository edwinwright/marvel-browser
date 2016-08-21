import React from 'react';
import { Provider } from 'react-redux';
import Routing from '../config/Routing';

import { createStore } from 'redux';
const reducer = (state, action) => {
  return state;
};
const store = createStore(reducer);

const Root = () => (
  <Provider store={store}>
    {Routing}
  </Provider>
);

export default Root;
