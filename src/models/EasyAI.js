const { AI } = require('./AI');

class Easy extends AI {
  getRow( boardState ) {
    const availableRows = boardState.top.map((top, idx) =>  (top > 0 ? idx : 0)).filter(top=>!!top);
    const rowId = availableRows[Math.floor(Math.random() * availableRows.length)];
    return rowId;
  }
  play(boardState, updateBoardState, playerId) {
    const rowId = this.getRow(boardState);
    super.play(rowId, boardState, updateBoardState, playerId);
  }
}

module.exports = { Easy };