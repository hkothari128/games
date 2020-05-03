import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import Board from './components/board';
import Timer from './components/timer';
// import PlayerSection from './components/player_section';
import { isWin } from './helpers';
import { Easy, Moderate } from './models';

import './styles.scss';



const App = () => {
  const [playerId, updatePlayer] = useState(1);
  const [winner, setWinner] = useState(0);
  const computerId = 1;
  const AI = new Moderate(computerId);

  const togglePlayer = (playerId) => {
    updatePlayer(playerId == 1 ? 2 : 1);
  }
  return (
    <div className="app">
      
      {/* <PlayerSection playerId={ 1 } active={ !winner && playerId === 1 } /> */}
      <Board
        playerId={ playerId }
        togglePlayer={ togglePlayer }
        isWin={ isWin }
        setWinner={ setWinner }
        running={ !winner }
        computerTurn={ playerId === computerId }
        AI={ AI }
        />
      <Timer running={ !winner } />
      {/* <PlayerSection playerId={ 2 } active={ !winner && playerId==2 } /> */}
    </div>
  );
};

const rootElement = document.body;
ReactDOM.render(<App />, rootElement);

export default App;
