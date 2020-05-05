import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import Game from './pages/game';
import PageNotFound from './pages/404';
import LandingPage from './pages/landing';


const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={ LandingPage } />
        <Route exact path="/game" component={ Game } />
        <Route exact path="/404" component={ PageNotFound } />
        <Redirect to="/404" />
      </Switch>
    </Router>
  );
};

const rootElement = document.body;
ReactDOM.render(<App />, rootElement);

export default App;
