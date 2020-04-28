import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { classList, allowDrop, drop, leaveDrop, initBoardState, handleWin, handleHover, handleClick } from '../../helpers';
import './styles.scss';




const Board = ({ rows, columns, playerId, togglePlayer, isWin, setWinner, running }) => {
  const [boardState, updateBoardState] = useState(initBoardState(rows, columns));

  useEffect(() => {
    if(boardState.lastPlayed === null){
      return;
    }
    const { rowId, slotId } = boardState.lastPlayed;
    
    const winnerSlots = isWin(boardState.board, rowId, slotId);
    
    if (winnerSlots) {
      handleWin(winnerSlots);
      setWinner(playerId);
    }
    else{
      togglePlayer(playerId);
    }
  }, [boardState])

  return (
    <div className="board">
      {
        Array(columns).fill(0).map((_, idx_row) => (
          <div className="board__super-row">
            <div className="board__entry">
            </div>
            <div
                className="board__row"
                value={ idx_row }
                onMouseEnter={ running ? () => handleHover('enter', idx_row, boardState, playerId) : undefined }
                onMouseLeave={ running ? () => handleHover('leave', idx_row, boardState, playerId) : undefined }
                onClick={ running ? () => handleClick(idx_row, boardState, updateBoardState, playerId) : undefined }
              >
              {
                Array(rows).fill(0).map((_, idx_slot) => (
                  <div
                    key= { idx_slot }
                    value={ JSON.stringify({ row: idx_row , slot: idx_slot }) }
                    className={ classList("board__slot",{ [boardState.board[idx_row][idx_slot]]: boardState.board[idx_row][idx_slot] }) }
                  />
                ))
              }  
            </div>
        </div>
        ))
      }
    </div>
  );
};

Board.defaultProps = {
  rows: 8,
  columns: 8,
}

Board.propTypes = {
  rows: PropTypes.number,
  columns: PropTypes.number,
};

export default Board;