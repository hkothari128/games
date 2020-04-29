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
    slot.className = 'board__entry'
  }
}

const dropAnimation = (up, down, duration) => {
  const diff = down.getBoundingClientRect().top - up.getBoundingClientRect().top;
  // up.classList.add('player-1');
  up.animate([
    // keyframes
    { transform: `translateY(${0}px)` },
    { transform: `translateY(${diff/2}px)` },
    { transform: `translateY(${diff}px)` },
    { transform: `translateY(${diff - 10}px)` },
    { transform: `translateY(${diff}px)` },
    { transform: `translateY(${diff - 5}px)` },
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
  !entrySlot.classList.contains(`player-${playerId}`) && entrySlot.classList.add(`player-${playerId}`);
  const topId = boardState.top[rowId];
  const targetSlot = getSlot(rowId,topId);
  // console.log( document.getElementsByClassName('board__row').map(()=>"hi"));
  Array.from(document.getElementsByClassName('board__row')).forEach((row)=>{
    row.style.pointerEvents = "none";
  });
  const clone = entrySlot.cloneNode(true)
  
  clone.style.position = 'absolute';
  
  const { top, bottom, left, right, height } = entrySlot.getBoundingClientRect();
  console.log(top,bottom,left,right, height);
  clone.style.left = left + "px";
  clone.style.right = right + "px";
  clone.style.top = top + "px";
  clone.style.bottom = bottom + "px";
  document.body.appendChild(clone);

  const duration = 700;
  entrySlot.classList.remove(`player-${playerId}`);
  
  dropAnimation(clone, targetSlot, duration);
  
  sleep(duration).then(()=>{
   
    document.body.removeChild(clone)
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
  handleClick(rowId, boardState, updateBoardState, playerId)  
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