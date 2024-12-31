import React, { useState } from 'react';

const ContryClock = (props) => {

  const {
    showSelect,
    timeZone
  } = props

  const [time, setTime] = useState(0)

  const interval = setInterval(() => {
    const japanTime = new Date().toLocaleString("en-US", {
      timeZone: timeZone.timeZone,
      hourCycle: 'h23',
      timeStyle: 'short'
    });
    setTime(japanTime)
  }, 1000)


  return (
      <div className="cntry">
        <h3>{timeZone.city}</h3>
        <h3>{time}</h3>
      </div>
  )
}
export default ContryClock;