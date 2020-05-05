import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { classList, initBoardState, handleWin, handleHover, handleClick, setPointerEvent, sleep } from '../../../../helpers';

import './styles.scss';


const Board = ({ rows, columns, playerId, togglePlayer, isWin, setWinner, running, computerTurn, AI }) => {
  const [boardState, updateBoardState] = useState(initBoardState(rows, columns));

  useEffect(()=>{
    if (computerTurn) {
      setPointerEvent('none', '.board__col');
      sleep(1000).then(() => {
        AI.play( boardState, updateBoardState, playerId);
      })
    }
  }, [computerTurn])

  useEffect(() => {
    // setPointerEvent('none', '.board__col');

    if(boardState.lastPlayed === null){
      return;
    }
    const { rowId, colId } = boardState.lastPlayed;
    
    const winnerSlots = isWin(boardState.board, rowId, colId, playerId);
    
    if (winnerSlots) {
      handleWin(winnerSlots);
      setWinner(playerId);
    }
    else {
      togglePlayer(playerId);
      setPointerEvent('auto', '.board__col');
    }
  }, [boardState])

  return (
    <div className="board">
      {
        Array(columns).fill(0).map((_, idx_col) => (
          <div className="board__super-col">
            <div className="board__entry">
            </div>
            <div
                className="board__col"
                value={ idx_col }
                onMouseEnter={ running ? () => handleHover('enter', idx_col, playerId) : undefined }
                onMouseLeave={ running ? () => handleHover('leave', idx_col, playerId) : undefined }
                onClick={ running ? () => handleClick(idx_col, boardState, updateBoardState, playerId) : undefined }
              >
              {
                Array(rows).fill(0).map((_, idx_row) => (
                  <div
                    key= { idx_row }
                    value={ JSON.stringify({ col: idx_col , row: idx_row }) }
                    className={ classList("board__slot",{ [boardState.board[idx_row][idx_col]]: boardState.board[idx_row][idx_col] }) }
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