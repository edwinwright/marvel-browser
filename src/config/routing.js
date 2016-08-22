import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

// Route components
import PageLayout from 'app/PageLayout';
import HomeLayout from 'features/home';
import { CharactersLayout, CharacterLayout } from 'features/characters';

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
