import React, { useContext } from 'react'
import { ChatContext } from '../context/ChatContext'

const Chatbar = () => {
    const {data} = useContext(ChatContext)
    return (
        <div className='chatInfo'>
            <span>{data.user?.displayName}</span>
            <div className="chatIcons">
                <img src="./img/video.png" alt="video" />
                <img src="./img/call.png" alt="Call" />
                <img src="./img/menu.png" alt="menu" />
            </div>
        </div>
    )
}

export default Chatbar
