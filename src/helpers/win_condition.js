const slotsToWin = 4;

const isWin = (board, rowId, slotId) => {
    const target = board[rowId][slotId];
    console.log(board,rowId,slotId,target)
    return (
      checkRight(board, rowId, slotId, target) ||
      checkBottom(board, rowId, slotId, target) ||
      checkLeftDown(board, rowId, slotId, target) ||
      checkRightDown(board, rowId, slotId, target)
    );
}

const getLeftMost = (board, rowId, slotId, target) => {
  while( rowId >= 0 && board[rowId][slotId] === target){
    rowId -=1;
  }
  
  return [rowId+1, slotId];
}

const getTopRightMost = (board, rowId, slotId, target) => {
  while( rowId < board.length && slotId>=0 && board[rowId][slotId] === target){
    rowId +=1;
    slotId -= 1;
  }
  
  return [rowId-1, slotId+1];
}

const getTopLeftMost = (board, rowId, slotId, target) => {
  while( rowId >=0 && slotId>=0 && board[rowId][slotId] === target){
    rowId -=1;
    slotId -= 1;
  }
  
  return [rowId+1, slotId+1];
}

const checkRight = (board, rowId, slotId, target) => {
  let [row, slot] = getLeftMost(board, rowId, slotId,target);
  let count = 0;
  const selected = []
  while( row < board.length && board[row][slot] === target){
    selected.push([row, slot]);
    count += 1;
    row  += 1;
  }
  // selected.push([rowId, slotId]);
  return count === slotsToWin ? selected : false;
}

const checkBottom = (board, rowId, slotId, target) => {
  let [row, slot] = [rowId, slotId];
  let count = 0;
  const selected = []
  while( slot < board[0].length && board[row][slot] === target){
    selected.push([row, slot]);
    count += 1;
    slot += 1;
  }
  // selected.push([rowId, slotId]);
  return count === slotsToWin ? selected : false;
}

const checkLeftDown = (board, rowId, slotId, target) => {
  let [row, slot] = getTopRightMost(board, rowId, slotId,target);
  let count = 0;
  const selected = []
  while( row>0 && slot < board[0].length && board[row][slot] === target){
    selected.push([row, slot]);
    count += 1;
    slot += 1;
    row -= 1;
  }
  // selected.push([rowId, slotId]);
  return count === slotsToWin ? selected : false;
}

const checkRightDown = (board, rowId, slotId, target) => {
  let [row, slot] = getTopLeftMost(board, rowId, slotId,target);
  let count = 0;
  const selected = []
  while( row < board.length && slot < board[0].length && board[row][slot] === target){
    selected.push([row, slot]);
    count += 1;
    slot += 1;
    row += 1;
  }
  // selected.push([rowId, slotId]);
  return count === slotsToWin ? selected : false;
}

export { isWin };