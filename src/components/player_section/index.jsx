import React from 'react';
import PropTypes from 'prop-types';

import Coin from '../coin';
// import { classList } from '../../helpers';

import './styles.scss';

const PlayerSection = ({ active, playerId }) => {
  return (
    <div className="player-section" >
      <Coin active={ active } playerId={ playerId } />
      { active && (
        <div className="active-pointer">
          <img src="https://img.icons8.com/android/24/000000/collapse-arrow.png"/>
        </div>
      )}
    </div>
  );
};

PlayerSection.defaultProps = {
  active: false,
};

PlayerSection.propTypes = {
  playerId: PropTypes.number.isRequired,
  active: PropTypes.bool,
};

export default PlayerSection;