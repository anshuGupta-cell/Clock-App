import React, { useRef, useState, useEffect } from 'react';
import DigitalClock from './DigitalClock.js';
import AnalogClock from './AnalogClock.js';
import Std from './Std.js';
import ContryClock from './ContryClock.js';
import SelectCountry from './SelectCountry.js';

const WorldClock = () => {

  const hourHandRef = useRef(null)
  const minHandRef = useRef(null)
  const secHandRef = useRef(null)
  const [timeZones, setTimeZones] = useState([{ id: 16, timeZone: 'Asia/Kolkata', city: 'India' },
])
  const [second, setSecond] = useState(0)
  const [minute, setMinute] = useState(0)
  const [hour, setHour] = useState(0)
  const [day, setDay] = useState()
  const [isDigital, setIsDigital] = useState(false)
  const [isSelect, setIsSelect] = useState(false)


  const countries = [
    { id: 0, name: 'Africa/Cairo', country: 'Egypt' },
    { id: 1, name: 'Africa/Johannesburg', country: 'South Africa' },
    { id: 2, name: 'Africa/Lagos', country: 'Nigeria' },
    { id: 3, name: 'America/Bogota', country: 'Colombia' },
    { id: 4, name: 'America/Buenos_Aires', country: 'Argentina' },
    { id: 5, name: 'America/Chicago', country: 'USA' },
    { id: 6, name: 'America/Los_Angeles', country: 'USA' },
    { id: 7, name: 'America/Mexico_City', country: 'Mexico' },
    { id: 8, name: 'America/New_York', country: 'USA' },
    { id: 9, name: 'America/Sao_Paulo', country: 'Brazil' },
    { id: 10, name: 'America/Toronto', country: 'Canada' },
    { id: 11, name: 'Asia/Bangkok', country: 'Thailand' },
    { id: 12, name: 'Asia/Dubai', country: 'United Arab Emirates' },
    { id: 13, name: 'Asia/Hong_Kong', country: 'Hong Kong' },
    { id: 14, name: 'Asia/Jakarta', country: 'Indonesia' },
    { id: 15, name: 'Asia/Kathmandu', country: 'Nepal' },
    { id: 16, name: 'Asia/Kolkata', country: 'India' },
    { id: 17, name: 'Asia/Manila', country: 'Philippines' },
    { id: 18, name: 'Asia/Riyadh', country: 'Saudi Arabia' },
    { id: 19, name: 'Asia/Seoul', country: 'South Korea' },
    { id: 20, name: 'Asia/Shanghai', country: 'China' },
    { id: 21, name: 'Asia/Singapore', country: 'Singapore' },
    { id: 22, name: 'Asia/Tehran', country: 'Iran' },
    { id: 23, name: 'Asia/Tokyo', country: 'Japan' },
    { id: 24, name: 'Australia/Perth', country: 'Australia' },
    { id: 25, name: 'Australia/Sydney', country: 'Australia' },
    { id: 26, name: 'Europe/Berlin', country: 'Germany' },
    { id: 27, name: 'Europe/London', country: 'United Kingdom' },
    { id: 28, name: 'Europe/Madrid', country: 'Spain' },
    { id: 29, name: 'Europe/Moscow', country: 'Russia' },
    { id: 30, name: 'Europe/Paris', country: 'France' },
    { id: 31, name: 'Europe/Rome', country: 'Italy' },
    { id: 32, name: 'Pacific/Auckland', country: 'New Zealand' },
    { id: 33, name: 'Pacific/Honolulu', country: 'USA' }
];

  useEffect(() => {
    const interval = setInterval(() => {
      const timeZone = new Date().toLocaleString("en-US", { timeZone: countries[16].name })
      const date = new Date(timeZone)
      const hr = date.getHours()
      const min = date.getMinutes()
      const sec = date.getSeconds()
      const daya = date.toDateString()

      secHandRef.current.style.transform = `translateY(-40%) rotate(${sec*6}deg)`
      minHandRef.current.style.transform = `translateY(-40%) rotate(${min*6 + sec/60}deg)`
      hourHandRef.current.style.transform = `translateY(-35%) rotate(${hr*30 + min*6/12}deg)`

      setSecond(sec)
      setMinute(min)
      setHour(hr)
      setDay(daya)

    }, 100)

    return () => {
      clearInterval(interval)
    }

  }, [])

  const showAnalog = () => {
    setIsDigital(false)
  }
  const showDigital = () => {
    setIsDigital(true)
  }
  const showSelect = () => {
    setIsSelect(true)
  }
  const hideSelect = () => {
    setIsSelect(false)
  }

  const handleSelect = (id, tz, city) => {
    setIsSelect(false)
    const newCity = {
      id: id,
      timeZone: tz,
      city: city
    }
    setTimeZones([...timeZones, newCity]);
    console.log(timeZones)
  }

  return (
    <div>
  <div className="mainContainer">
    <div className="WCcontainer">
      <div className="header">
        <h3>World Clock</h3>
      </div>
      {isDigital?
      <DigitalClock
      hour={hour}
      minute={minute}
      showAnalog={showAnalog}
      second={second}
      day={day}
      />: 
      <AnalogClock
      hourHandRef={hourHandRef}
      minHandRef={minHandRef}
      secHandRef={secHandRef}
      showDigital={showDigital
      }
      />
      }

      { !isDigital && <Std day={day}/>}

    </div>  
    
    {isSelect?
    <SelectCountry
    hideSelect={hideSelect}
    countries={countries}
    handleSelect={handleSelect}
    />: 
    <div className="wCDown">
        {timeZones.map((tz, i)=>(
        <ContryClock
        showSelect={showSelect}
        timeZone={tz}
        />
        ))}
      <div className="addAlarmCont">
        <div onClick={showSelect}>
          <img width="28px" className="invert" src="/svg/plus-sign-stroke-rounded.svg" alt=""/>
        </div>
      </div>
    </div>
      }

  </div>
</div>

  )
}
export default WorldClock;