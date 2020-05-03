
const windowLength = 4;
const emptyId = 0;
const count = (array, key) => array.filter((val) => val === key).length;

const evaluateWindow = (window, playerId) => {
  const opponentId = playerId == 1 ? 2 : 1;
  let score = 0;

  if (count(window, playerId) === 4) {
    score += 100;
  }
  else if (count(window, playerId) === 3 && count(window, emptyId) === 1) {
    score += 5;
  }
  else if (count(window, playerId) === 2 && count(window, emptyId) === 2) {
    score += 2;
  }

  if (count(window, opponentId) === 3 && count(window, emptyId) === 1) {
    score -= 4;
  }

  return score;
}


const scorePosition = (board, playerId) => {
  let score = 0;
  
  // horizontal
  for(let r = board.length - 1; r >= 0; r--) {
    const row = [];
    for(let c = 0; c<board[0].length;c++) {
      row.push(board[r][c]);
    }
    if(count(row, emptyId) === row.length) {
      break;
    }
    // console.log(row,r, row.length,row.length - windowLength+1, "*********");

    for(let k = 0; k < row.length - windowLength + 1; k++ ){
      const window = row.slice(k, k + windowLength);
      score += evaluateWindow(window, playerId);
      
    }    
  }

  //vertical
  for(let c = 0; c < board[0].length;c++) {
    const col = [];
    if( board[board.length - 1][c] === emptyId) {
      continue;
    }
    for(let r = board.length - 1; r >= 0; r--) {
      col.push(board[r][c]);
    }

    

    for(let k = 0; k < col.length - windowLength + 1; k++ ){
      const window = col.slice(k, k + windowLength);
      score += evaluateWindow(window, playerId);
    }    
  }

  //diagnoal up
  for(let r = board.length - 1; r >= windowLength - 1; r--) {
    for(let c = 0; c < board[0].length - windowLength + 1; c++) {
      const window = [];
      for(let k = 0; k < windowLength; k++) {
        window.push(board[r-k][c+k]);
      }
      score += evaluateWindow(window, playerId);    
    }
  }

  //diagnoal down
  for(let r = 0 ; r < board.length - windowLength + 1; r++) {
    for(let c = 0; c < board[0].length - windowLength + 1; c++) {
      const window = [];
      for(let k = 0; k < windowLength; k++) {
        window.push(board[r+k][c+k]);
      }
      score += evaluateWindow(window, playerId);    
    }
  }

  return score;
}

export { scorePosition }