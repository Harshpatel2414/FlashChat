import React from 'react'
import ChatConatiner from './ChatConatiner'
import UserContainer from './UserContainer'

const Home = () => {
  return (
    <div className="home">
      <div className='container'>
        <UserContainer />
        <ChatConatiner />
      </div>
    </div>
  )
}

export default Home;
