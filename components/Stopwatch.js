import React, { useState, useRef } from 'react';

const Stopwatch = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0)
  const [minTime, setMinTime] = useState(0)
  const miliSec = useRef(0)
  const second = useRef(0)
  const minute = useRef(0)
  const intervalRef = useRef(null)
  const [marks, setMarks] = useState([])
  const [btnDisabled, setBtnDisabled] = useState(true)

  const handlePlay = () => {
    setIsRunning(true);
    setBtnDisabled(false);
    if (!isRunning) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      intervalRef.current = setInterval(() => {
        miliSec.current += 1;
        second.current = miliSec.current / 100

        if (second.current >= 60) {
          second.current = 0;
          miliSec.current = 0;
          minute.current = minute.current + 1;
        }
        setMinTime(minute.current)
        setTime(second.current)
      }, 10);
    }
  };

  const handlePause = () => {
    if (isRunning) {
      setIsRunning(false)
      console.log('paused')
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
  }
  const handleReset = () => {
    setIsRunning(false)
    setBtnDisabled(true);
    setMinTime(0)
    setTime(0)
    second.current = 0;
    miliSec.current = 0;
    minute.current = 0;
    setMarks([ ])
  }


  const handleMark = () => {
  const lastMark = marks[0] || {
    minuteTime: 0,
    secondTime: 0,
  };
  const addedMinutes = minTime - parseInt(lastMark.minuteTime, 10);
  const addedSeconds = time - parseFloat(lastMark.secondTime);
  const newMark = {
    id: marks.length + 1,
    add: `+${addedMinutes < 10 ? "0" + addedMinutes : addedMinutes}:${
      addedSeconds < 10 ? "0" + addedSeconds.toFixed(2) : addedSeconds.toFixed(2)
    }`,
    minuteTime: `${minTime < 10 ? "0" + minTime : minTime}`,
    secondTime: `${time < 10 ? "0" + time.toFixed(2) : time.toFixed(2)}`,
  };
  // Update the marks array
  setMarks([newMark, ...marks]);
  };

  return (
    <div>
  <div className="mainCont">
    <div className="headerStop">
      <h3>Stopwatch</h3>
    </div>
    <div className="stopMainC">
      <div className="stopBody">
        <div className="dHour">
        {minTime<10?'0'+minTime:minTime}
        </div>
        <p>:</p>
        <div className="dMinutes">
        {time<10?'0'+Math.floor(time.toFixed(2)):Math.floor(time.toFixed(2))}
        </div>
        <p>.</p>
        <div className="dSeconds">
        {(() => {
        const fractionalPart = Math.floor((time   % 1) * 100);
        return isNaN(fractionalPart)
        ? '00'
        : fractionalPart < 10
        ? '0' + fractionalPart
        : fractionalPart;
        })()}
      </div>

      </div>
      <div className="stopMarks">
      {marks.map((mark,i )=>(
        <div key={mark.id} className="sMark">
          <p className={i === 0?'green':' '}>{mark.id}</p>
          <p>{mark.add}</p>
          <p>{`${mark.minuteTime}:${mark.secondTime}`}</p>
        </div>
      ))}
      </div>
      <div className="stopCtrlCont">
        <div className="stopCtrl">
            <svg
            onClick={isRunning?undefined:handleReset} 
            className={`${isRunning?'fill-grey':'fill-white'} ${btnDisabled?'disNone':' '}`} 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 512 512">
              <path d="M472 224c13.3 0 24-10.7 24-24l0-144c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 80.1-20-23.5C387 63.4 325.1 32 256 32C132.3 32 32 132.3 32 256s100.3 224 224 224c50.4 0 97-16.7 134.4-44.8c10.6-8 12.7-23 4.8-33.6s-23-12.7-33.6-4.8C332.2 418.9 295.7 432 256 432c-97.2 0-176-78.8-176-176s78.8-176 176-176c54.3 0 102.9 24.6 135.2 63.4l.1 .2s0 0 0 0L418.9 176 328 176c-13.3 0-24 10.7-24 24s10.7 24 24 24l144 0z"/>
            </svg>
            <div 
          onClick={isRunning? handlePause : handlePlay} className='sPlayPauseCont'>
            <img className='invert' src={`/svg/${isRunning?'pause':'play'}-solid.svg`}/>
          </div>
          <div>
            <svg onClick={handleMark}
            className={` ${btnDisabled?'disNone':' '}`}
            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color={isRunning?'white':'grey'} fill="none">
              <path d="M4 7L4 21" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M11.7576 3.90865C8.45236 2.22497 5.85125 3.21144 4.55426 4.2192C4.32048 4.40085 4.20358 4.49167 4.10179 4.69967C4 4.90767 4 5.10138 4 5.4888V14.7319C4.9697 13.6342 7.87879 11.9328 11.7576 13.9086C15.224 15.6744 18.1741 14.9424 19.5697 14.1795C19.7633 14.0737 19.8601 14.0207 19.9301 13.9028C20 13.7849 20 13.6569 20 13.4009V5.87389C20 5.04538 20 4.63113 19.8027 4.48106C19.6053 4.33099 19.1436 4.459 18.2202 4.71504C16.64 5.15319 14.3423 5.22532 11.7576 3.90865Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </div>
        </div>
      </div>
    </div>

  </div>
</div>

  )
}
export default Stopwatch;



// <img   src='/svg/flag-02-stroke-rounded.svg'/>
