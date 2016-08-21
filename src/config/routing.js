import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

// Route components
import PageLayout from 'app/PageLayout';
import HomeLayout from 'features/home';
import CharactersLayout from 'features/characters';

const Routing = (
  <Router history={ browserHistory }>
    <Route path="/" component={PageLayout}>
      <IndexRoute component={HomeLayout} />
      <Route path="characters" component={CharactersLayout} />
    </Route>
  </Router>
);

export default Routing;
