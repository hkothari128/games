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

const handleWin = (winnerSlots) => {
  winnerSlots.reverse().forEach(slotIds => {
    const [rowNo, slotNo] = slotIds;
    const slot = getSlot(rowNo, slotNo);
    slot.classList.add('board__slot--winner');
  });
}

const initBoardState = (rows, columns) => (
  {
    board: Array(columns).fill(0).map(()=> Array(rows).fill(0)),
    top: Array(columns).fill(rows-1),
    lastPlayed: null,
  }
);


const simulateClick = (elem) => {
	// Create our event (with options)
	var evt = new MouseEvent('click', {
		bubbles: true,
		cancelable: true,
		view: window
	});
	// If cancelled, don't dispatch our event
	var canceled = !elem.dispatchEvent(evt);
};

const playTurn = (boardState, updateBoardState, playerId) => {

  const availableRows = boardState.top.map((top, idx) =>  (top > 0 ? idx : 0)).filter(top=>!!top);
  const rowId = availableRows[Math.floor(Math.random() * availableRows.length)];

  // console.log(rowId,"COMP")
  const entrySlot = getEntrySlot(rowId);
  
  const topId = boardState.top[rowId];
  const targetSlot = getSlot(rowId,topId);

  simulateClick(targetSlot);
  // const duration = 600;
  // dropAnimation(entrySlot, targetSlot, duration);
  
  // sleep(duration).then(()=>{
  //   entrySlot.classList.remove(`player-${playerId}`);
    
  //   const newBoardState = { ...boardState };
  //   newBoardState.top[rowId] = topId - 1;
  //   newBoardState.board[rowId][topId] = playerId;
  //   newBoardState.lastPlayed = { rowId, slotId: topId };
  
  //   updateBoardState(newBoardState);
  // });
  
}

export { initBoardState, handleWin, handleHover, handleClick, playTurn };