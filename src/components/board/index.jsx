import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

const Board = ({ rows, columns }) => {
  return (
    <div className="board">
      {
        Array(rows).fill(0).map(() => (
          <div className="board__row">
            {
              Array(columns).fill(0).map(() => (
                <div className="board__slot"/>
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