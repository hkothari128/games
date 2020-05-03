const { AI } = require('./AI');
const { minimax } = require('../helpers');

class Moderate extends AI {
  getRow( boardState ) {

    const compId = this.getId();
    const playerId = compId === 1 ? 2 : 1;
    const [rowId, score] = minimax(boardState, 6, -Infinity, Infinity, compId, true, null, null, compId, playerId);
    console.log(rowId, score);
    // const availableRows = getValidRows(boardState)
    // let rowId = 0;
    // console.log(rowId,"default");
    // let maxScore = -Infinity;

    // availableRows.forEach((row) => {
    //   const tempBoardState = JSON.parse(JSON.stringify(boardState))
    //   const top = tempBoardState.top[row];
    //   tempBoardState.board[row][top] = this.getId();
    //   console.log("**************************", row);
    //   const score = scorePosition(tempBoardState.board,this.getId())
    //   if(score > maxScore) {
    //     maxScore = score;
    //     rowId = row;
    //   }
    // })
    
    // // const rowId = availableRows[Math.floor(Math.random() * availableRows.length)];
    return rowId;
  }
  play(boardState, updateBoardState, playerId) {
    const rowId = this.getRow(boardState);
    super.play(rowId, boardState, updateBoardState, playerId);
  }
}

module.exports = { Moderate };