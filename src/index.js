
import './styles.scss';
import 'babel-polyfill';


import React from 'react';
import { render } from 'react-dom';
import Root from './app/Root';

render(
  <Root />,
  document.getElementById('root')
);
