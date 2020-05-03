const slotsToWin = 4;

const isWin = (board, rowId, colId, target) => {
    // const target = board[rowId][colId];

    return (
      checkRight(board, rowId, colId, target) ||
      checkBottom(board, rowId, colId, target) ||
      checkLeftDown(board, rowId, colId, target) ||
      checkRightDown(board, rowId, colId, target)
    );
}

const getLeftMost = (board, rowId, colId, target) => {
  while( colId >= 0 && board[rowId][colId] === target){
    colId -=1;
  }
  
  return [rowId, colId + 1];
}

const getTopRightMost = (board, rowId, colId, target) => {
  while( rowId >=0 && colId < board.length && board[rowId][colId] === target){
    rowId -= 1;
    colId += 1;
  }
  
  return [rowId+1, colId-1];
}

const getTopLeftMost = (board, rowId, colId, target) => {
  while( rowId >=0 && colId>=0 && board[rowId][colId] === target){
    rowId -=1;
    colId -= 1;
  }
  
  return [rowId+1, colId+1];
}

const checkRight = (board, rowId, colId, target) => {
  let [row, col] = getLeftMost(board, rowId, colId,target);
  let count = 0;
  const selected = []
  while( row < board.length && board[row][col] === target && count < slotsToWin){
    selected.push([row, col]);
    count += 1;
    col  += 1;
  }
  // selected.push([rowId, colId]);
  return count === slotsToWin ? selected : false;
}

const checkBottom = (board, rowId, colId, target) => {
  let [row, col] = [rowId, colId];
  let count = 0;
  const selected = []
  while( row < board[0].length && board[row][col] === target && count < slotsToWin){
    selected.push([row, col]);
    count += 1;
    row += 1;
  }
  // selected.push([rowId, slotId]);
  return count === slotsToWin ? selected : false;
}

const checkLeftDown = (board, rowId, colId, target) => {
  let [row, col] = getTopRightMost(board, rowId, colId,target);
  let count = 0;
  const selected = []
  while( row < board.length && col >= 0 && board[row][col] === target && count < slotsToWin){
    selected.push([row, col]);
    count += 1;
    col -= 1;
    row += 1;
  }
  // selected.push([rowId, slotId]);
  return count === slotsToWin ? selected : false;
}

const checkRightDown = (board, rowId, colId, target) => {
  let [row, col] = getTopLeftMost(board, rowId, colId,target);
  let count = 0;
  const selected = []
  while( row < board.length && col < board[0].length && board[row][col] === target && count < slotsToWin){
    selected.push([row, col]);
    count += 1;
    col += 1;
    row += 1;
  }
  // selected.push([rowId, slotId]);
  return count === slotsToWin ? selected : false;
}

export { isWin };