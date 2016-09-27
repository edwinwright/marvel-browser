import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import PageLayout from '../views/PageLayout';
import HomeLayout from '../views/HomeLayout';
import CharactersLayout from '../views/CharactersLayout';
import CharacterLayout from '../views/CharacterLayout';

const Routing = (
  <Router history={ browserHistory }>
    <Route path="/" component={PageLayout}>
      <IndexRoute component={HomeLayout} />
      <Route path="characters" component={CharactersLayout} />
      <Route path="characters/:id" component={CharacterLayout} />
    </Route>
  </Router>
);

export default Routing;
