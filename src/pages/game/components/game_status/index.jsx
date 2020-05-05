import React from 'react';

// import './styles.scss';

const Status = ({ winner, playerId, compId, compName }) => {

  const playerName = playerId === compId ? `Computer (${compName})` : 'Player';

  return (
    <div className="game__status">
        { winner ? "Winner: " : "Playing: "}
        { playerName }
    </div>
  );
}

export default Status;