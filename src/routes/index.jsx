import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Game from '../pages/game';
import PageNotFound from '../pages/404';
import LandingPage from '../pages/landing';
import Scores from '../pages/scores';
import PlayerForm from '../pages/player_form';

const routes = (
    <Switch>
        <Route path="/" component={LandingPage}/>
        <Route path="/game_details" component={ PlayerForm } />
        <Route path="/game" component={ Game } />
        <Route path="/scores" component={ Scores } />
        {/* <Route path="*" component={ PageNotFound } /> */}
    </Switch>
);

export default routes;