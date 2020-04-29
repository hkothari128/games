import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import Board from './components/board';
import PlayerSection from './components/player_section';
import { isWin } from './helpers';

import './styles.scss';
import Timer from './components/timer';

const App = () => {
  const [playerId, updatePlayer] = useState(1);
  const [winner, setWinner] = useState(0);
  const computerId = 2;

  const togglePlayer = (playerId) => {
    updatePlayer(playerId == 1 ? 2 : 1);
  }
  return (
    <div className="app">
      <Timer running={ !winner } />
      {/* <PlayerSection playerId={ 1 } active={ !winner && playerId === 1 } /> */}
      <Board
        playerId={ playerId }
        togglePlayer={ togglePlayer }
        isWin={ isWin }
        setWinner={ setWinner }
        running={ !winner }
        computerTurn={ playerId === computerId }
        />
      {/* <PlayerSection playerId={ 2 } active={ !winner && playerId==2 } /> */}
    </div>
  );
};

const rootElement = document.body;
ReactDOM.render(<App />, rootElement);

export default App;
