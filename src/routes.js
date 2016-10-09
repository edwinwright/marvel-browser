import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import HomePage from './containers/HomePage';
import SearchPage from './containers/SearchPage';
import CharacterPage from './containers/CharacterPage';

const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="search" component={SearchPage} />
    <Route path="character/:id" component={CharacterPage} />
  </Route>
);

export default routes;
