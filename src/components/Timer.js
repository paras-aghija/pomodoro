import React, { useState, useEffect } from 'react'
import Time from './Time'
import './Timer.css'

const STYPES = ["pomodoro", "break", "lbreak"]

const Timer = () => {
    const [time,setTime] = useState(25*60)
    const [sessionLength, setsessionLength] = useState(25);
    const [breakLength, setBreakLength] = useState(5);
    const [start, setStart] = useState(false)
    const [sessionType, setSessionType] = useState(STYPES[0])
    // const [inTime, setInTime] = useState(null)
    // const [outTime, setOutTime] = useState(null)

    const startSession = () => {
        if(start === true){
            console.log("No change")
            return
        }        
        if(sessionType === STYPES[0]){
            setTime(sessionLength*60)
        }
        else{
            setTime(breakLength*60)
        }
        setStart(true)
    }

    const endSession = () => {
        if(!start === true){
            console.log("No change")
            return;
        }
        setStart(false)
    }

    useEffect(() => {
        if(time===0){
            console.log("Time Ended")
            return;
        }
        start && time>0 && setTimeout(() => setTime(time-1), 1000)
        return () => clearTimeout()
    }, [time,start])

    

    return (
        <div className="timer">
            <div className="time__display">
                
                {/* <div className="settings">
                    <div className="settings__section">
                        <label id="break-label">Break Length</label>
                        <div className="break__settings">
                            <button className="break__dec">-</button>
                            <span className="break__length">{breakLength}</span>
                            <button className="break__inc">+</button>
                        </div>
                    </div>
                    <div className="settings__section">
                    <label id="session-label">Break Length</label>
                        <div className="session__settings">
                            <button className="session__dec">-</button>
                            <span className="session__length">{breakLength}</span>
                            <button className="session__inc">+</button>
                        </div>
                    </div>
                </div> */}


                <Time timeLeftInSecs={time}/>

                <div className="controllers">
                    <button className="start__timer" onClick={startSession}>
                        START
                    </button>
                    <button className="end__timer" onClick={endSession}>
                        END
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Timer
