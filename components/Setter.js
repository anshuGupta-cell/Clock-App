import React, { useRef, useEffect, useCallback } from 'react';

const Setter = (props) => {
  const {
    settDisplay,
    handleOffScreen,
    aHrs,
    aMin,
    setAHrs,
    setAMin,
    addAlarm,
    inHrs,
    setInHrs,
    inMins,
    setInMins,
    nowHour,
    nowMin
  } = props;

  const hrsRef = useRef();
  const minRef = useRef();
  const boxRef = useRef();
  const minutesBoxRef = useRef();
  const spanRef = useRef([]);
  const minSpanRef = useRef([]);

  const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));
  const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));

  const logCenterElement = (box, spans) => {
    const boxRect = box.getBoundingClientRect();
    const centerY = boxRect.top + boxRect.height / 2;
    let centerElement = null;

    spans.forEach((span) => {
      const spanRect = span.getBoundingClientRect();
      if (spanRect.top <= centerY && spanRect.bottom >= centerY) {
        centerElement = span;
      }
      span.style.fontSize = '';
    });

    if (centerElement) {
      centerElement.style.fontSize = '1.5rem';
      return centerElement.textContent.trim();
    }
  };

  const handleScroll = useCallback(() => {
    const hours = logCenterElement(boxRef.current, spanRef.current);
    setAHrs(hours);
  }, [setAHrs]);


  const handleMinScroll = useCallback(() => {
    const minutes = logCenterElement(boxRef.current, minSpanRef.current);
    setAMin(minutes);
  }, [setAMin]);

  // to add
  const handleInHours = () => {}
  const handleInMins = () => {}

  useEffect(() => {
    hrsRef.current.addEventListener('scroll', () => {
      handleScroll()
      handleInHours()
    });
    minRef.current.addEventListener('scroll', handleMinScroll);

    return () => {
      hrsRef.current.removeEventListener('scroll', () => {
        handleScroll()
        handleInHours()
      });
      minRef.current.removeEventListener('scroll', handleMinScroll);
    };
  }, []);

  return (
    <div
      className="mainContSetter"
      style={{
        display: settDisplay,
      }}
    >
      <div className="settHeader">
        <img
          width="24px"
          onClick={handleOffScreen}
          className="invert"
          src="/svg/xmark-regular.svg"
          alt="Close"
        />
        <h3>Edit Alarm</h3>
        <img
          width="30px"
          onClick={addAlarm}
          className="invert"
          src="/svg/tick-02-stroke-rounded.svg"
          alt="Save"
        />
      </div>
      <p>
        Alarm will ring in {(()=>{
          const betHrs = aHrs - nowHour;
          const betMin = aMin - nowMin
          
          if (betHrs == 0 && betMin < 0) {
            return 23+' h '+ (60+betMin)+' min.';
          }
          
          return (betHrs < 0 ? (24 + betHrs)+' h ': betHrs +' h ') + (betMin<0?(60+betMin)+' min.':betMin+' min.');
        })()} 

      </p>
      <div className="settcontainer">
        <div ref={boxRef} className="box">
          <div>
            <div ref={hrsRef} className="hrs">
              {hours.map((hour, i) => (
                <span
                  key={hour}
                  ref={(el) => {
                    spanRef.current[i] = el;
                  }}
                >
                  {hour}
                </span>
              ))}
            </div>
            <p>h</p>
          </div>
          <div>
            <div ref={minRef} className="min">
              {minutes.map((minute, i) => (
                <span
                  key={minute}
                  ref={(el) => {
                    minSpanRef.current[i] = el;
                  }}
                >
                  {minute}
                </span>
              ))}
            </div>
            <p>min</p>
          </div>
        </div>
        <div className="observer"></div>
      </div>
    </div>
  );
};

export default Setter;