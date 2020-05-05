const sleep = (duration) => {
  return new Promise(resolve => setTimeout(resolve, duration));
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

const addClone = (slot) => {
  const clone = slot.cloneNode(true)
  const { top, bottom, left, right } = slot.getBoundingClientRect();
  
  clone.style.position = 'absolute';
  clone.style.left = left + "px";
  clone.style.right = right + "px";
  clone.style.top = top + "px";
  clone.style.bottom = bottom + "px";

  document.body.appendChild(clone);
  return clone;
}

const setPointerEvent = ( value, selector ) => {
  Array.from(document.querySelectorAll(selector)).forEach((row)=>{
    row.style.pointerEvents = value;
  });
}

export { dropAnimation, addClone , sleep, setPointerEvent };