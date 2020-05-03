const { handleClick } = require('../helpers');

class AI {
  constructor(id) {
    this.playerId = id;
  }
  getId() {
    return this.playerId;
  }
  play (rowId, boardState, updateBoardState, playerId) {
    handleClick(rowId, boardState, updateBoardState, playerId)
  }
}

module.exports = { AI };
