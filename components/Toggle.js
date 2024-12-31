import React from 'react';

const Toggle = (props)=>{
  const {
    toggleAlarm,
    state,
    id
  } = props
  
  return (
    
    <ul onClick={()=>{toggleAlarm(id)}} className="toggleBody" style = {state ? { background: '#0FEC37', } : { background: 'gray' }}>
      <ul className="circle" style= {state ? {right: '0.3rem',}:{left: '0.3rem'}}>
        <ul className="circle2" style = {state ? { background:'white', } : { background: 'gray' }}></ul>
      </ul>
    </ul>
    
  )
}
export default Toggle;