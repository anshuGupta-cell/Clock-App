import React, { useState, useRef, useEffect } from 'react';

const AnalogClock = (props) => {
  const {
    hourHandRef,
    minHandRef,
    showDigital,
    secHandRef
  } = props;
  const timeRef = useRef([])
  const timeBoxRef = useRef([])
  const tickRef = useRef([])

  const numbers = Array.from({ length: 4 });
  const bars = Array.from({ length: 60 })

  useEffect(() => {
    for (let i = 0; i < numbers.length; i++) {
      timeRef.current[i].style.transform = `rotate(${(-90)*(i+1)}deg)`
      timeBoxRef.current[i].style.transform = `rotate(${(90)*(i+1)}deg)`
    }
    
    for (let i = 0; i < bars.length; i++) {
      tickRef.current[i].style.transform = `rotate(${6*i}deg)`
    }
  },[])

  return (
    <div>
      <div className="clockBody" onClick={showDigital}>
      {numbers.map((number, i)=>(
        <div ref={(el) => {
          timeBoxRef.current[i] = el;
          }} key={i} className="number">
          <span ref={(el) => {
            timeRef.current[i] = el;
            }}>{(i+1)*3}</span>
        </div>
      ))}
      {bars.map((_,i)=>(
        <div 
        key={i} 
        ref={(el)=>{tickRef.current[i]=el;}}
        className={`bars ${i%5==0?'hrBar':' '}`}>
          <div></div>
        </div>
      ))}

        <div ref={hourHandRef} className="hour"></div>
        <div ref={minHandRef} className="minutes"></div>
        <div ref={secHandRef} className="seconds"></div>

        <div className="dot"></div>
      </div>
  </div>
  )
}

export default AnalogClock;