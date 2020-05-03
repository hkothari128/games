import { addClone, dropAnimation, sleep, setPointerEvent } from './DOM_functions';

const getSlot = (rowId, colId) => {
  const query = `.board__slot[value='{"col":${colId},"row":${rowId}}']`;
  return document.querySelector(query);
};

const getEntrySlot = colId => document.querySelectorAll('.board__entry')[colId];

const handleHover = (action, colId, playerId) => {
  const slot = getEntrySlot(colId)

  if (action === 'enter') {
    slot.classList.add(`player-${playerId}`);
  }
  else if (action === 'leave') {
    slot.className = 'board__entry'
  }
};


const handleClick = (colId, boardState, updateBoardState, playerId) => {
  setPointerEvent("none");

  const entrySlot = getEntrySlot(colId);
  !entrySlot.classList.contains(`player-${playerId}`) && entrySlot.classList.add(`player-${playerId}`);
  const rowId = boardState.top[colId];
  const targetSlot = getSlot(rowId,colId);
  
  const clone = addClone(entrySlot);
  entrySlot.classList.remove(`player-${playerId}`);
  
  const duration = 700;
  dropAnimation(clone, targetSlot, duration);
  
  sleep(duration).then(()=>{
   
    document.body.removeChild(clone)
    const newBoardState = { ...boardState };
    newBoardState.top[colId] = rowId - 1;
    newBoardState.board[rowId][colId] = playerId;
    newBoardState.lastPlayed = { colId, rowId };
  
    updateBoardState(newBoardState);
  });
  
};

const handleWin = winnerSlots => {
  winnerSlots.reverse().forEach(slotIds => {
    const [rowNo, slotNo] = slotIds;
    const slot = getSlot(rowNo, slotNo);
    slot.classList.add('board__slot--winner');
  });
};

const initBoardState = (rows, columns) => ({
    board: Array(rows).fill(0).map(()=> Array(columns).fill(0)),
    top: Array(columns).fill(rows-1),
    lastPlayed: null,
});

const playTurn = (boardState, updateBoardState, playerId) => {

  const availableRows = boardState.top.map((top, idx) =>  (top > 0 ? idx : 0)).filter(top=>!!top);
  const rowId = availableRows[Math.floor(Math.random() * availableRows.length)];
  handleClick(rowId, boardState, updateBoardState, playerId)
};

const getValidCols = boardState => boardState.top.map((top, idx) =>  (top > 0 ? idx : -1)).filter(top=>top>=0);

const getRandomCol = availableRows => availableRows[Math.floor(Math.random() * availableRows.length)];

export { initBoardState, handleWin, handleHover, handleClick, playTurn, getValidCols, getRandomCol};