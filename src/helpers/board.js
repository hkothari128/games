import { Easing } from 'tween'

const getSlot = (rowId, slotId) => {
  const query = `.board__slot[value='{"row":${rowId},"slot":${slotId}}']`;
  return document.querySelector(query);
};

const getEntrySlot = rowId => document.querySelectorAll('.board__entry')[rowId];

const handleHover = (action, rowId, boardState, playerId) => {
  const slot = getEntrySlot(rowId)
  const topId = boardState.top[rowId];
  const targetSlot = getSlot(rowId,topId);

  // dropAnimation(slot,targetSlot);
  if (action === 'enter') {
    slot.classList.add(`player-${playerId}`);
    
  }
  else if (action === 'leave') {
    slot.classList.remove(`player-${playerId}`);
    
  }
}

const dropAnimation = (up, down, duration) => {

  console.log(up,up.getBoundingClientRect().top)
  const diff = down.getBoundingClientRect().top - up.getBoundingClientRect().top;
  up.animate([
    // keyframes
    { transform: `translateY(${0}px)` }, 
    { transform: `translateY(${diff}px)` },
    { transform: `translateY(${diff - 30}px)` },
    { transform: `translateY(${diff}px)` },
  
  ], { 
    // timing options
    duration: duration,
    iterations: 1,
  });
  return true;
}

const sleep = (duration) => {
  return new Promise(resolve => setTimeout(resolve, duration));
}

const handleClick = (rowId, boardState, updateBoardState, playerId) => {

  const entrySlot = getEntrySlot(rowId);
  
  const topId = boardState.top[rowId];
  const targetSlot = getSlot(rowId,topId);
  const duration = 600;
  dropAnimation(entrySlot, targetSlot, duration);
  
  sleep(duration).then(()=>{
    entrySlot.classList.remove(`player-${playerId}`);
    
    const newBoardState = { ...boardState };
    newBoardState.top[rowId] = topId - 1;
    newBoardState.board[rowId][topId] = playerId;
    newBoardState.lastPlayed = { rowId, slotId: topId };
  
    updateBoardState(newBoardState);
  });
  
}


const drop = (e, boardState, updateBoardState, playerId) => {
  e.preventDefault();
  e.target.nextSibling.classList.remove('board__row--hovering');
  const newBoardState = { ...boardState };
  const rowId = parseInt(e.target.getAttribute('value'));
  const topId = newBoardState.top[rowId];
  if(topId == 0)
    return;

  newBoardState.top[rowId] = topId - 1;
  newBoardState.board[rowId][topId] = playerId;
  newBoardState.lastPlayed = { rowId, slotId: topId };
  updateBoardState(newBoardState);
};

const handleWin = (winnerSlots) => {
  winnerSlots.reverse().forEach(slotIds => {
    const [rowNo, slotNo] = slotIds;
    const slot = getSlot(rowNo, slotNo);
    slot.classList.add('board__slot--winner');
  });
}

const allowDrop = (e) => {
  e.preventDefault();
  e.target.nextSibling.classList.add("board__row--hovering");
};

const leaveDrop = (e) => {
  e.target.nextSibling.classList.remove("board__row--hovering");
};

const initBoardState = (rows, columns) => (
  {
    board: Array(columns).fill(0).map(()=> Array(rows).fill(0)),
    top: Array(columns).fill(rows-1),
    lastPlayed: null,
  }
);

export { drop, allowDrop, leaveDrop, initBoardState, handleWin, handleHover, handleClick };