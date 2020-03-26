import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

const Board = ({ rows, columns }) => {

  const clickHandler = (e) => {
    console.log(JSON.parse(e.target.getAttribute('value')));
  }

  return (
    <div className="board">
      {
        Array(columns).fill(0).map((_, idx_row) => (
          <div key={ idx_row } className="board__row">
            {
              Array(rows).fill(0).map((_, idx_slot) => (
                <div key= { idx_slot } value={ JSON.stringify({ row: idx_row , slot: idx_slot }) } className="board__slot" onClick={clickHandler}/>
              ))
            }  
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