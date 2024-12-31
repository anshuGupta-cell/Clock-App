import React from 'react';
import Std from './Std.js';

const DigitalClock = (props)=>{
  
  const {
    showAnalog,
    second,
    minute,
    hour,
    day,
  } = props
  
  return(
    <div>
      <div className="dContainer" onClick={showAnalog}>
        <ul className="digitalBody">
          <div className="dHour">{hour<10?'0'+hour:hour}</div>
          <p>:</p>
          <div className="dMinutes">{minute<10?'0'+minute:minute}</div>
          <p>:</p>
          <div className="dSeconds">{second<10?'0'+second:second}</div>
        </ul>
        <Std day={day}/>
      </div>
    </div>
  )
}

export default DigitalClock;