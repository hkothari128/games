import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import Game from './pages/game';
import PageNotFound from './pages/404';
import LandingPage from './pages/landing';
import Scores from './pages/scores';
import PlayerForm from './pages/player_form';


const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={ LandingPage } />
        <Route exact  path="/game_details" component={ PlayerForm } />
        <Route exact  path="/game" component={ Game } />
        <Route exact  path="/scores" component={ Scores } />
        <Route exact  path="/404" component={ PageNotFound } />
        <Redirect to="/404" />
      </Switch>
    </Router>
  );
};

const rootElement = document.getElementById("app");
ReactDOM.hydrate(<App />, rootElement);
// if (rootElement.hasChildNodes()) {
//   ReactDOM.hydrate(<App />, rootElement);
// } else {
//   ReactDOM.render(<App />, rootElement);
// }
// ReactDOM.render(<App />, rootElement);

export default App;
