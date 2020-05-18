import React from 'react';

// import './styles.scss';

const Status = ({ winner, playerId, compId, compName, playerNames }) => {
  const playerName = compId === 0 ? playerNames[playerId]: playerId === compId ? compName : playerNames[1];

  return (
    <div className="game__status">
        { winner ? "Winner: " : "Playing: "}
        { playerName }
    </div>
  );
}

export default Status;