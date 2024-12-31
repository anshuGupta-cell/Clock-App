import React from 'react';


const Std = (props)=>{
  
  const {
    day
  } = props;
  
  return(
    <div>
      <div className="std">
          <p>India Standard Time | {day}</p>
      </div>
    </div>
  )
}

export default Std;