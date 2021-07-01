import React from 'react'
import './Header.css'

const Header = () => {
    return (
        <div className="header">
            <h1 className="heading">POMODORO TIMER</h1>
            <p className="about__timer">
            You have heard about the pomodoro technique and you want to know more...<br/>
            Is it just another productivity hack? Does it really work? Will it work for you?<br/>
            Implementing the pomodoro technique is simple and requires minimal setup. That is why it will work wonders for your productivity. Grab your pen and paper, plan your day, then start your timer for 25 minutes. Easy!
            </p>
        </div>
    )
}

export default Header
