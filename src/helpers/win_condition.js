const isWin = (board, rowId, slotId) => {
    const target = board[rowId][slotId];
    const slotsToWin = 4;
    if (
      getLeftMost(board, rowId, slotId, target) === slotsToWin ||
      getRightMost(board, rowId, slotId, target) === slotsToWin ||
      getBottomMost(board, rowId, slotId, target) === slotsToWin ||
      getLeftDownMost(board, rowId, slotId, target) === slotsToWin ||
      getRightDownMost(board, rowId, slotId, target) === slotsToWin
    ) {
      console.log("WIN!");
      return true;
    }
}

const getLeftMost = (board, rowId, slotId, target) => {
  let count = 1;
  while( rowId > 0 && board[rowId][slotId] === target){
    count += 1;
    rowId -= 1;
  }
  return count;
}

const getRightMost = (board, rowId, slotId, target) => {
  let count = 1;
  while( rowId < (board.length - 1) && board[rowId][slotId] === target){
    count += 1;
    rowId += 1;
  }
  return count;
}

const getBottomMost = (board, rowId, slotId, target) => {
  let count = 1;
  while( slotId < board[0].length - 1 && board[rowId][slotId] === target){
    count += 1;
    slotId += 1;
  }
  return count;
}

const getLeftDownMost = (board, rowId, slotId, target) => {
  let count = 1;
  while( rowId>0 && slotId < board[0].length - 1 && board[rowId][slotId] === target){
    count += 1;
    slotId += 1;
    rowId -= 1;
  }
  return count;
}

const getRightDownMost = (board, rowId, slotId, target) => {
  let count = 1;
  while( rowId < board.length && slotId < board[0].length - 1 && board[rowId][slotId] === target){
    count += 1;
    slotId += 1;
    rowId += 1;
  }
  return count;
}

export { isWin };