import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { db } from '../firebase'
import { collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from 'firebase/firestore'

const Search = () => {
  const { currentUser } = useContext(AuthContext)
  const [username, setUsername] = useState('')
  const [user, setUser] = useState(null)
  const [error, setError] = useState(false)

  const handleSearch = async () => {
    const q = query(collection(db, 'users'), where("name", "==", username));
    try {
      const querySearch = await getDocs(q);
      querySearch.forEach((doc) => {
        setUser(doc.data())
      })
    } catch (err) {
      setError(true)
    }
  }
  const handleKey = () => {
    handleSearch()
  }

  const handleSelect = async () => {
    console.log('clicked')
    const combinedId = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        await setDoc(doc(db, "chats", combinedId), { messages: [] });
      }
      await updateDoc(doc(db, "userChats", currentUser.uid), {
        [combinedId + ".userInfo"]: {
          uid: user.uid,
          displayName: user.name,
          photoURL: user.photoURL,
        }, [combinedId + '.date']: serverTimestamp(),
      });
      await updateDoc(doc(db, "userChats", user.uid), {
        [combinedId + ".userInfo"]: {
          uid: currentUser.uid,
          displayName: currentUser.displayName,
          photoURL: currentUser.photoURL,
        },
        [combinedId + '.date']: serverTimestamp(),
      });

    } catch (error) {
      console.log(error)
      setError(true)
    }
    setUser(null);
    setUsername('')
  };

  return (
    <div className='search'>
      <div className="searchForm" >
        <input type="text" placeholder='search user here' onChange={e => setUsername(e.target.value)} value={username} />
        <img src="./img/search.png" alt="" onClick={handleKey} />
      </div>
      {error && <span>user not found!</span>}
      {user && (<div className="userChatInfo" onClick={handleSelect}>
        <img src={user.photoURL} alt="" />
        <div className="userInfo">
          <span>{user.name}</span>
        </div>
      </div>)}
    </div>
  );
};

export default Search;
