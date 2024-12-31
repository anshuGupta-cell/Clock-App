import React from 'react';

const CountDown = (props)=>{
  
  const {
    rHr,
    rMin,
    rSec,
    prog
  } = props

  return(
  <div className="timerTimeCont">
    <svg className="Tcircle" >
      <circle cx="100" cy="100" r="90" ></circle>
      <circle cx="100" cy="100" r="90" strokeLinecap="round" className="prog" style={{strokeDashoffset:prog}}></circle>
    </svg>
    <p className="timerTime">{rHr<10?'0'+rHr:rHr}:{rMin<10?'0'+rMin:rMin}:{rSec<10?'0'+rSec:rSec}</p>
  </div>
  )
}

export default CountDown;