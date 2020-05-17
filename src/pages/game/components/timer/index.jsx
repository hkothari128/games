import React, { useEffect, useReducer, useState } from 'react';

import './styles.scss';

const formatted = num => ( ("0" + num).slice(-2));

const reducer = ( state ) => {
  return add(state);
}

const add = (state) => {
  state.seconds += 1;
  if (state.seconds >= 60) {
      state.seconds = 0;
      state.minutes++;
      if (state.minutes >= 60) {
          state.minutes = 0;
          state.hours += 1;
      }
  }
  return state;
}

const initState = ({
  hours: 0,
  minutes: 0,
  seconds: 0,
});
const Timer = ({ running, setTime }) => {
  const [time, updateTime] = useReducer(reducer, initState);
  const [seconds, setSeconds] = useState(time.seconds);
  const [minutes, setMinutes] = useState(time.minutes);
  const [hours, setHours] = useState(time.hours);

  useEffect(() => {
    
    
    const timer = setInterval(() => {
      updateTime();
      setSeconds(time.seconds);
      setMinutes(time.minutes);
      setHours(time.hours);     
    }, 1000);

    if(!running)
    clearInterval(timer);
    
    return ()=>clearInterval(timer);
    
  },[seconds])

  useEffect(() => {
    if(!running)
      setTime(`${formatted(hours)}:${formatted(minutes)}:${formatted(seconds)}`);
  },[running])
  
  return (
    <div className="timer">
      <time>
        {`${formatted(hours)}:${formatted(minutes)}:${formatted(seconds)}`}
      </time>
    </div>
  )
}

export default Timer;