import React, { useState, useRef, useEffect, useCallback } from 'react';

const TSetter = (props) => {

  const {
    setTHr,
    setTMin,
    setTSec
  } = props;

  const boxRef = useRef()
  const hourRef = useRef([])
  const minRef = useRef([])
  const secRef = useRef([])
  const hrCont = useRef()
  const minCont = useRef()
  const secCont = useRef()


  const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));
  const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));
  const seconds = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));


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

  const hourScroll = useCallback(() => {
    const hr = logCenterElement(boxRef.current, hourRef.current)
    setTHr(hr)
  }, [setTHr])

  const minScroll = useCallback(() => {
    const min = logCenterElement(boxRef.current, minRef.current)
    setTMin(min)
  }, [setTMin])

  const secScroll = useCallback(() => {
    const sec = logCenterElement(boxRef.current, secRef.current)
    setTSec(sec)
  }, [setTSec])

  useEffect(() => {
    hrCont.current.addEventListener('scroll', () => {
      hourScroll()
    })
    minCont.current.addEventListener('scroll', () => {
      minScroll()
    })
    secCont.current.addEventListener('scroll', () => {
      secScroll()
    })

    return () => {
      hrCont.current.removeEventListener('scroll', () => {
        hourScroll()
      })
      minCont.current.removeEventListener('scroll', () => {
        minScroll()
      })
      secCont.current.removeEventListener('scroll', () => {
        secScroll()
      })
    }

  }, [hourScroll, minScroll, secScroll])


  return (
    <div className="Tcontainer">
        <div ref={boxRef} className="box tbox">
          <div>
            <div ref={hrCont} className="hrs">
            {hours.map((hour, i)=>(
              <span
              key={hour}
              ref={(el)=>{
                hourRef.current[i] = el;
              }}
              >{hour}</span>
            ))}
            </div>
          </div>
          <p>:</p>
          <div>
            <div ref={minCont} className="min">
            {minutes.map((minute,i)=>(
              <span
              key={minute}
              ref={(el)=>{
                minRef.current[i] = el;
              }}
              >{minute}</span>
            ))}
            </div>
          </div>
          <p>:</p>
          <div>
            <div ref={secCont} className="min">
            {seconds.map((second,i)=>(
              <span
              key={second}
              ref={(el)=>{
                secRef.current[i] = el;
              }}
              >{second}</span>
            ))}
            </div>
          </div>
        </div>
        <div className="observer"></div>
      </div>
  )
}

export default TSetter;