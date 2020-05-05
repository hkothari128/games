import React from 'react';
import PropTypes from 'prop-types';

import { classList } from '../../helpers';

import './styles.scss';

const drag = (e) => {
  e.dataTransfer.effectAllowed = "move";
  // e.dataTransfer.setData("transfer", e.target.id);
  e.target.classList.add("coin--dragging");
};
const noAllowDrop = (e) => {
  e.stopPropagation();
};

const dropped = (e) => {
  e.target.classList.remove("coin--dragging");
};

const Coin = ({ active, playerId }) => {
  return (
    <div
      className={ classList("coin", { [playerId]: playerId, active })}
      draggable={ active }
      onDragStart={ active ? drag : null }
      onDragOver={ active ? noAllowDrop : null }
      onDrop={ active ? dropped : null }
    />
  );
};

Coin.defaultProps = {
  active: false,
};

Coin.propTypes = {
  active: PropTypes.bool,
  playerId: PropTypes.number.isRequired,
};

export default Coin;