import { doc, onSnapshot } from 'firebase/firestore'
import React, { useContext, useEffect, useState } from 'react'
import { db } from '../firebase'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'

const Chats = () => {
  const [chats, setChats] = useState([])
  const {currentUser} = useContext(AuthContext)
  const {dispatch} = useContext(ChatContext)

  useEffect(()=>{
    const getChats =()=>{
      const data = onSnapshot(doc(db,'userChats',currentUser.uid),(doc)=>{
        setChats(doc.data())
      });
      return ()=>{data()};
    };
    currentUser.uid && getChats();
  },[currentUser.uid]);
  
  const handleSelect =(data)=>{
    dispatch({type:"CHANGE_USER",payload: data});
  };

  return (
    <div className='chats'>
      { Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat)=>(
        <div className="userChatInfo" key={chat[0]} onClick={()=>handleSelect(chat[1].userInfo)}>
        <img src={chat[1].userInfo.photoURL} alt="" />
        <div className="userInfo">
          <span>{chat[1].userInfo.displayName}</span>
          <p>{chat[1].lastMessage?.text.slice(0,15)}</p>
        </div>
      </div>
      ))}
    </div>
  )
};

export default Chats;
