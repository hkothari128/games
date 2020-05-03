import { getRandomCol, getValidCols } from './board';
import { isWin } from './win_condition';
import { scorePosition } from './score_position';

function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}


const boardWin = (board, playerId) => {
  // horizontal
  for(let r = 0; r < board.length; r++) {
    for(let c = 0; c < board.length - 3; c++) {
      if( board[r][c] === playerId && board[r][c+1] === playerId && board[r][c+2] === playerId && board[r][c+3] === playerId ) {
        return true;
      }
    }
  }

  //vertical
  for(let c = 0; c < board.length; c++) {
    for(let r = 0; r < board.length - 3; r++) {
      if( board[r][c] === playerId && board[r+1][c] === playerId && board[r+2][c] === playerId && board[r+3][c] === playerId ) {
        return true;
      }
    }
  }

  //diagonal down
  for(let r = 0; r < board.length - 3; r++) {
    for(let c = 0; c < board.length - 3; c++) {
      if( board[r][c] === playerId && board[r+1][c+1] === playerId && board[r+2][c+2] === playerId && board[r+3][c+3] === playerId ) {
        return true;
      }
    }
  }

  //diagonal up
  for(let r = board.length - 1; r > 2; r--) {
    for(let c = 0; c < board.length - 3; c++) {
      if( board[r][c] === playerId && board[r-1][c+1] === playerId && board[r-2][c+2] === playerId && board[r-3][c+3] === playerId ) {
        return true;
      }
    }
  }

  return false;
}

const isTerminal = (boardState, rowId, colId, playedId, validCols) => {

  // if(boardState.board[4][5]===1) {
  //   console.log(boardState,playerId,validCols);
  // }
  if(!rowId || !colId) {
    return -1;
  }
  if(isWin(boardState.board,rowId,colId,playedId)){
    return playedId;
  }
  // if(boardWin(boardState.board, playerId)) {
  //   // console.log("WITH PLAYER ", playerId );
  //   return playerId;
  // }
  else if( validCols.length === 0) {
    return 0;
  }
  return -1;
}

const minimax = (boardState, depth, alpha, beta, playedId, maximizingPlayer, rowId, colId, compID, playerId) => {
  const validCols = getValidCols(boardState);
  const terminal = isTerminal(boardState,rowId,colId, playedId, validCols);
  if(terminal !== -1 || depth == 0) {
    if (terminal !== -1){
      switch(terminal){
        case compID: 
          return [null, 100000];

        case playedId:
          return [null, -100000];
        
        case 0:
          return [null, 0];
      }
    }
    else {
      // console.log(boardState.board, scorePosition(boardState.board, playerId));
      return [null, scorePosition(boardState.board, compID)];
    } 
  }


  if(maximizingPlayer) {
    let score = -Infinity;
    shuffle(validCols);
    let bestCol = getRandomCol(validCols);

    for(let i = 0; i < validCols.length; i++) {
      const col = validCols[i];
      const tempBoardState = JSON.parse(JSON.stringify(boardState))
      const row = tempBoardState.top[col];
      const played = compID
      tempBoardState.board[row][col] = played;
      tempBoardState.top[col]--;
      const newScore = minimax(tempBoardState, depth-1, alpha, beta, played, false, row, col, compID, playerId)[1];
      // console.log(col,newScore,"***");
      if(newScore > score) {
        score = newScore;
        bestCol = col;
      }

      alpha = Math.max(alpha, score);
      if(alpha >= beta) {
        break;
      }
    }

    return [bestCol, score];
  }

  else {
    let score = Infinity;
    shuffle(validCols);
    let bestCol = getRandomCol(validCols);
    for(let i = 0; i < validCols.length; i++) {
      const col = validCols[i];
      const tempBoardState = JSON.parse(JSON.stringify(boardState))
      const row = tempBoardState.top[col];
      const played = playerId
      tempBoardState.board[row][col] = played;
      tempBoardState.top[col]--;
      const newScore = minimax(tempBoardState, depth-1, alpha, beta, played, true, row, col, compID, playerId)[1];
      // console.log(col,newScore,"###");
      if(newScore < score) {
        score = newScore;
        bestCol = col;
      }

      beta = Math.min(beta, score);
      if(alpha >= beta) {
        break;
      }
    }

    return [bestCol, score];
  }
};

export { minimax, boardWin, isTerminal };