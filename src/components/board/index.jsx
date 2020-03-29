import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { classList } from '../../helpers';
import './styles.scss';


const drop = (e, boardState, updateBoardState, playerId, togglePlayer, isWin, setWinner) => {
  e.preventDefault();
  e.target.nextSibling.classList.remove("board__row--hovering");
  const newBoardState = { ...boardState };
  const rowId = parseInt(e.target.getAttribute('value'));
  const topId = newBoardState.top[rowId];
  if(topId == 0)
    return;

  newBoardState.top[rowId] = topId - 1;
  newBoardState.board[rowId][topId] = playerId;
  updateBoardState(newBoardState);
  togglePlayer(playerId);
  if(isWin(boardState.board, rowId, topId))
    setWinner(playerId);
};

// const handleDrop = (target) => {
//   if (this.state.emptyIdx >= 0) {
//     const slotRow = target.parentNode;
//     const row = slotRow.getElementsByTagName("div")[1];
//     const slot = row.getElementsByClassName("Slot")[this.state.emptyIdx];
//     slot.style.background = this.props.player.slotStyle.background;
//     slot.playerID = this.props.player.id;
//     this.setState({ emptyIdx: this.state.emptyIdx - 1 });
//     this.props.handleDrop(slot);
//   }
// };

const allowDrop = (e) => {
  e.preventDefault();
  e.target.nextSibling.classList.add("board__row--hovering");
};

const leaveDrop = (e) => {
  e.target.nextSibling.classList.remove("board__row--hovering");
};

const initBoardState = (rows, columns) => (
  {
    board: Array(columns).fill(0).map(()=> Array(rows).fill(0)),
    top: Array(columns).fill(rows-1),
    rows,
    columns,
  }
);


const Board = ({ rows, columns, playerId, togglePlayer, isWin, setWinner }) => {
  const [boardState, updateBoardState] = useState(initBoardState(rows, columns));
  
  return (
    <div className="board">
      {
        Array(columns).fill(0).map((_, idx_row) => (
          <div>
            <div
              className="board__entry board__slot"
              key={ idx_row }
              value={ idx_row }
              onDrop={ (e)=> drop(e, boardState, updateBoardState, playerId, togglePlayer, isWin, setWinner ) }
              onDragOver={ (e)=> allowDrop(e, boardState) }
              onDragLeave={ (e)=>leaveDrop(e, boardState) }
            />
            <div className="board__row">
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
  columns: 7,
}

Board.propTypes = {
  rows: PropTypes.number,
  columns: PropTypes.number,
};

export default Board;