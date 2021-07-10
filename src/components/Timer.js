import React, { useState, useEffect } from 'react'
import Table from './Table'
import Time from './Time'
import './Timer.css'

const STYPES = ["pomodoro", "break"]
const today = new Date().toISOString().slice(0,10)

const Timer = () => {

    const [time,setTime] = useState(25*60)
    const [sessionLength, setsessionLength] = useState(25);
    const [breakLength, setBreakLength] = useState(5);
    const [start, setStart] = useState(false)
    const [sessionType, setSessionType] = useState(STYPES[0])
    
    const [inTime, setInTime] = useState(null)
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
        setInTime(new Date().toLocaleTimeString())
        setStart(true)
    }
    const addTimestamp = () => {
        var loadedData = JSON.parse(localStorage.getItem('data'))
        console.log(loadedData)
        if(loadedData == null || loadedData.date !== today) {
            loadedData = {
                date: today,
                timestamps: []
            }
        }
        const timestamp = {
            stype: sessionType,
            in: inTime,
            out: new Date().toLocaleTimeString()
        }
        loadedData = {...loadedData, timestamps: [...loadedData.timestamps, timestamp]}
        console.log(loadedData)
        localStorage.setItem('data', JSON.stringify(loadedData))
    }

    const endSession = () => {
        if(!start === true){
            console.log("No change")
            return;
        }
        addTimestamp()
        setStart(false)
    }

    


    const incBreak = () => {
        if(start){return}
        setBreakLength(breakLength+1)
        if(sessionType === STYPES[0]){return}
        setTime((breakLength+1)*60)
    }
    const decBreak = () => {
        if(start){return}
        breakLength!==1 && setBreakLength(breakLength-1)
        if(sessionType === STYPES[0]){return}
        setTime((breakLength-1)*60)
    }
    const incSession = () => {
        if(start){return}
        setsessionLength(sessionLength+1)
        if(sessionType === STYPES[1]){return}
        setTime((sessionLength+1)*60)
    }
    const decSession = () => {
        if(start){return}
        sessionLength!==1 && setsessionLength(sessionLength-1)
        if(sessionType === STYPES[1]){return}
        setTime((sessionLength-1)*60)
    }

    useEffect(() => {
        if(time===0){
            console.log("Time Ended")
            endSession()
            console.log(start)
            return;
        }
        start && time>0 && setTimeout(() => setTime(time-1), 1000)
        return () => clearTimeout()
    }, [time,start, endSession])

    

    return (
        <div className="timer">
            <div className="time__display">
                
                <div className="settings">
                    <div className="settings__section">
                        <label id="break-label">Break Length</label>
                        <div className="break__settings">
                            <button className="break__dec" onClick={decBreak}>-</button>
                            <span 
                                className={sessionType===STYPES[0] ? "break__length black" : "break__length blue" }
                                onClick={() => {
                                    if(start){return}
                                    setSessionType(STYPES[1])
                                    setTime(breakLength*60)
                                }}
                            >
                                {breakLength}
                            </span>
                            <button className="break__inc" onClick={incBreak}>+</button>
                        </div>
                    </div>
                    <div className="settings__section">
                    <label id="session-label">Session Length</label>
                        <div className="session__settings">
                            <button className="session__dec" onClick={decSession}>-</button>
                            <span
                                className={sessionType===STYPES[0] ? "break__length blue" : "break__length black" }
                                onClick={() => {
                                    if(start){return}
                                    setSessionType(STYPES[0])
                                    setTime(sessionLength*60)
                                }}
                            >
                                {sessionLength}
                            </span>
                            <button className="session__inc" onClick={incSession}>+</button>
                        </div>
                    </div>
                </div>


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

            <Table/>
        </div>
    )
}

export default Timer
