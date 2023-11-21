import React from 'react'
import Chatbar from './Chatbar'
import Chating from './Chating'
import Input from './Input'

const ChatConatiner = () => {
  return (
    <div className="chat">
      <Chatbar/>
      <Chating/>
      <Input />
    </div>
  )
}

export default ChatConatiner
