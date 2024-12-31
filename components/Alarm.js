import React, { useState, useRef, useEffect } from 'react';
import Setter from './Setter.js';
import Toggle from './Toggle.js';
import Add from './Add.js';

const Alarm = () => {
  const [settDisplay, setSettDisplay] = useState('none');
  const [aHrs, setAHrs] = useState(0)
  const [aMin, setAMin] = useState(0)
  const [nowHour, setNowHour] = useState(0)
  const [nowMin, setNowMin] = useState(0)
  const hrCurrRef = useRef(0)
  const minCurrRef = useRef(0)
  const dateRef = useRef(0)
  const [inHrs, setInHrs] = useState(0)
  const [inMins, setInMins] = useState(0)
  const [times, setTimes] = useState([])
  const [audio] = useState(new Audio())

// displaing setter 
  const handleOnScreen = () => {
    setSettDisplay('block');
  }
  const handleOffScreen = () => {
    setSettDisplay('none')
  }
  
// running current time 
  const ringAlarm = (hrs, min, i) => {
    const interval = setInterval(() => {
      dateRef.current = new Date()
      hrCurrRef.current = dateRef.current.getHours()
      minCurrRef.current = dateRef.current.getMinutes()

      setNowHour(hrCurrRef.current)
      setNowMin(minCurrRef.current)

    }, 1000)
    return ()=>{clearInterval(interval)}

  }

  // check alarms state and rimg it
  useEffect(() => {
    times.forEach((time, id) => {
      typeof(time.min)
      if (time.state) {
        if (nowHour == time.hrs && nowMin == time.min) {
          console.log('tring tring ' + nowMin)
          audio.play()

          setTimeout(() => {
            toggleAlarm(id)
            audio.currentTime = 0;
          }, 59900);
        }
      } else if (time.state == false) {
        console.log('pause')
        audio.pause()
      }
    });
  }, [nowMin, nowHour, toggleAlarm, times, audio])

  const toggleAlarm = (id) => {
    setTimes((prevTimes) =>
      prevTimes.map((t, idx) =>
        idx === id ? { ...t, state: !t.state } : t
      )
    );
  };

  function demoAla() {
    const demoAlarm = {
      id: 0,
      state: false,
      hrs: 15,
      min: 50,
    }
    setTimes([demoAlarm])
  }

  // load demo alarm
  useEffect(() => {
    demoAla()
    ringAlarm()
    audio.src = '/RingTone/1.mp3'
    audio.load()
  }, [])

  // add alarms to the array
  const addAlarm = () => {
    const newTime = {
      id: times.length,
      state: true,
      hrs: aHrs,
      min: aMin
    }
    setTimes([...times, newTime])
    handleOffScreen()
  }

  return (
    <div>
  <div className="mainCont">
    <div className="headerAlarm">
      <h3>Alarm</h3>
    </div>
    <div className="container alarmCo">
    
    {times.map((time,i)=>(
      <div className="alarmC" key={time.id}>
        <div onClick={handleOnScreen} className="alarm" style = {time.state ? { color:'white', } : { color: 'gray' }}>
          <h1>{time.hrs}:{time.min}</h1>
          <p>Once</p>
        </div>
        <div className="toggleCont">
          <Toggle
          toggleAlarm={toggleAlarm}
          state={time.state}
          id={time.id}
          />
        </div>
      </div>
    ))}
    </div>
    
    <Add
    handleOnScreen={handleOnScreen}
    />

  </div>
  <Setter
  settDisplay={settDisplay}
  handleOffScreen={handleOffScreen}
  aHrs={aHrs}
  aMin={aMin}
  setAHrs={setAHrs}
  setAMin={setAMin}
  addAlarm={addAlarm}
  inHrs={inHrs}
  inMins={inMins}
  nowMin={nowMin}
  nowHour={nowHour}
  />
</div>

  )
}
export default Alarm;