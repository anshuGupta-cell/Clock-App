import React from 'react';

const Add = (props)=>{
  
  const {handleOnScreen} = props;
  
  return(
  <div className="addAlarmCont">
    <div onClick={handleOnScreen}>
      <img width="28px" className="invert" src="/svg/plus-sign-stroke-rounded.svg" alt=""/>
    </div>
  </div>
  )
}
export default Add;