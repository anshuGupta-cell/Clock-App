import React, { useState, useRef, useEffect } from 'react';
import TimerCtrl from './TimerCtrl.js';
import TSetter from './TSetter.js';
import CountDown from './CountDown.js';

const Timer = () => {
  const [tHr, setTHr] = useState(0);
  const [tmin, setTMin] = useState(0);
  const [tsec, setTSec] = useState(0);
  const [rHr, setRHr] = useState(0);
  const [rMin, setRMin] = useState(0);
  const [rSec, setRSec] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [prog, setProg] = useState(565.51)
  const [showCD, setShowCD] = useState(false)
  const [btnDisabled, setBtnDisabled] = useState(true)
  const [audio] = useState(new Audio())

  const intervalRef = useRef(null);


  useEffect(() => {
    audio.src = '/RingTone/2.m4A'
    audio.load()
    audio.volume = 0.5;
  },[])

  const timer = (distance) => {

    let remainingHrs, remainingMins, remainingSecs
    let progress;

    const now = Date.now();

    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - now;
      const remaining = distance - elapsed;
      progress = 565.51 - (565.51 * remaining / distance)
      setProg(progress)

      if (remaining <= 0) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        ring();
        setRHr(0);
        setRMin(0);
        setRSec(0);
        setProg(565.51);
        setBtnDisabled(true);
        setShowCD(false)
        setIsRunning(false)
        return;
      }

      remainingSecs = Math.floor((remaining / 1000) % 60);
      remainingMins = Math.floor((remaining / (1000 * 60)) % 60);
      remainingHrs = Math.floor(remaining / (1000 * 60 * 60));

      setRSec(remainingSecs);
      setRMin(remainingMins);
      setRHr(remainingHrs);
      setTSec(remainingSecs);
      setTMin(remainingMins);
      setTHr(remainingHrs);

    }, 10);

  };

  const startTimer = () => {
    const distance = (parseInt(tHr) * 3600 + parseInt(tmin) * 60 + parseInt(tsec)) * 1000;
    if (distance == 0) {
      alert('scroll to enter some value')
    } else {
      setShowCD(true)
      setIsRunning(true);
      setBtnDisabled(false)
      timer(distance);
      console.log('rinning')
    }
  };

  const stopTimer = () => {
    if (intervalRef.current && isRunning) {
      clearInterval(intervalRef.current);
      setIsRunning(false);
      console.log('paused')
    }
  };

  const resetTimer = () => {
    if (!isRunning) {
      stopTimer();
      setShowCD(false);
      setTHr(0);
      setTMin(0);
      setTSec(0);
      setRHr(0);
      setRMin(0);
      setRSec(0);
      setProg(565.51);
      setBtnDisabled(true);
      setIsRunning(false);
    }
  };

  const ring = () => {
    audio.currentTime = 0;
    audio.play().catch(err => console.error('Audio playback failed:', err));
    audio.loop = true;
    setTimeout(()=>{
      audio.pause()
    },6500)

  };



  return (
    <div>
      <div className="timerMainCont">
        <div className="tUpCont">
          <div className="headerT">
            <h3>Timer</h3>
          </div>
          {showCD?
            (<CountDown
            rHr={rHr}
            rMin={rMin}
            rSec={rSec}
            prog={prog}
            />):
            (<TSetter 
            setTHr={setTHr} 
            setTMin={setTMin} 
            setTSec={setTSec} 
            />)
          }
            
        </div>
        <TimerCtrl 
        startTimer={startTimer}
        stopTimer={stopTimer}
        resetTimer={resetTimer}
        isRunning={isRunning}
        btnDisabled={btnDisabled}
        />
      </div>
    </div>
  );
};

export default Timer;