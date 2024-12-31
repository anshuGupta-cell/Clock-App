import React from 'react';

const TimerCtrl = (props) => {

  const {
    startTimer,
    stopTimer,
    resetTimer,
    isRunning,
    btnDisabled
  } = props;

  return (
    <div className="tDownCont">
          <div>
            <svg width='20px' height='20px'
            onClick = { resetTimer }
            style={{fill: isRunning?'grey':'white'}}
            className = {btnDisabled?'disNone':' '}
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 512 512">
              <path d="M472 224c13.3 0 24-10.7 24-24l0-144c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 80.1-20-23.5C387 63.4 325.1 32 256 32C132.3 32 32 132.3 32 256s100.3 224 224 224c50.4 0 97-16.7 134.4-44.8c10.6-8 12.7-23 4.8-33.6s-23-12.7-33.6-4.8C332.2 418.9 295.7 432 256 432c-97.2 0-176-78.8-176-176s78.8-176 176-176c54.3 0 102.9 24.6 135.2 63.4l.1 .2s0 0 0 0L418.9 176 328 176c-13.3 0-24 10.7-24 24s10.7 24 24 24l144 0z"/>
              </svg>
          </div>
          <div 
          onClick={isRunning? stopTimer : startTimer }
          className='sPlayPauseCont'>
            <img className='invert' src={`/svg/${isRunning?'pause':'play'}-solid.svg`}/>
          </div>
          <div 
           className='op-zero'>
            <img className='invert' src={`/svg/play-solid.svg`}/>
          </div>
        </div>
  )
}

export default TimerCtrl;