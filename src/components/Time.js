import React from 'react'
import './Time.css'

const Time = ({timeLeftInSecs}) => {
    const formatTime = (timeLeftInSecond) => {
        let minute = Math.floor(timeLeftInSecond / 60);
        if (minute < 10) minute = '0' + minute;
      
        let second = timeLeftInSecond - 60 * minute;
        if (second < 10) second = '0' + second;
      
        return `${minute}:${second}`;
      }
      
    return (
        <div className="times">
        <div className="times-content">
          <span id="time-left">{formatTime(timeLeftInSecs)}</span>
        </div>
      </div>
    )
}

export default Time
