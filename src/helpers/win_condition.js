const slotsToWin = 4;

const isWin = (board, rowId, slotId) => {
    const target = board[rowId][slotId];
    
    return (
      getLeftMost(board, rowId, slotId, target) ||
      getRightMost(board, rowId, slotId, target) ||
      getBottomMost(board, rowId, slotId, target) ||
      getLeftDownMost(board, rowId, slotId, target) ||
      getRightDownMost(board, rowId, slotId, target)
    );
}

const getLeftMost = (board, rowId, slotId, target) => {
  let count = 1;
  const selected = []
  while( rowId > 0 && board[rowId][slotId] === target){
    selected.push([rowId, slotId]);
    count += 1;
    rowId -= 1;
  }
  selected.push([rowId, slotId]);
  return count === slotsToWin ? selected : false;
}

const getRightMost = (board, rowId, slotId, target) => {
  let count = 1;
  const selected = []
  while( rowId < (board.length - 1) && board[rowId][slotId] === target){
    selected.push([rowId, slotId]);
    count += 1;
    rowId += 1;
  }
  selected.push([rowId, slotId]);
  return count === slotsToWin ? selected : false;;
}

const getBottomMost = (board, rowId, slotId, target) => {
  let count = 1;
  const selected = []
  while( slotId < board[0].length - 1 && board[rowId][slotId] === target){
    selected.push([rowId, slotId]);
    count += 1;
    slotId += 1;
  }
  selected.push([rowId, slotId]);
  return count === slotsToWin ? selected : false;
}

const getLeftDownMost = (board, rowId, slotId, target) => {
  let count = 1;
  const selected = []
  while( rowId>0 && slotId < board[0].length - 1 && board[rowId][slotId] === target){
    selected.push([rowId, slotId]);
    count += 1;
    slotId += 1;
    rowId -= 1;
  }
  selected.push([rowId, slotId]);
  return count === slotsToWin ? selected : false;
}

const getRightDownMost = (board, rowId, slotId, target) => {
  let count = 1;
  const selected = []
  while( rowId < board.length && slotId < board[0].length - 1 && board[rowId][slotId] === target){
    selected.push([rowId, slotId]);
    count += 1;
    slotId += 1;
    rowId += 1;
  }
  selected.push([rowId, slotId]);
  return count === slotsToWin ? selected : false;
}

export { isWin };