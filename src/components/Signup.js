import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import React from 'react'
import { auth, db, storage } from '../firebase'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { setDoc, doc } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate()
  function previewImage(event) {
    const input = event.target;
    const image = document.getElementById('preview');
    if (input.files && input.files[0]) {
       var reader = new FileReader();
       reader.onload = (e) =>{
          image.src = e.target.result;
       }
       reader.readAsDataURL(input.files[0]);
    }
 }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const file = e.target[0].files[0]
    const username = e.target[1].value
    const email = e.target[2].value
    const password = e.target[3].value
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const storageRef = ref(storage, `profile${username}`);
      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            await updateProfile(res.user, {
              displayName: username,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              name: username,
              email: email,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate('/');
          }
          catch (error) {
            console.log(error);
          }
        });
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className='form-container'>
      <div className="mainInfo">
        <img src="./img/flash.png" alt="" />
        <h1>FlashChat</h1>
        <p>The most user friendly chat application.</p>
      </div>
      <div className="form-wrap">
        <span className="logo">Register</span>
        <form onSubmit={handleSubmit}>
          <label htmlFor="file">
            <img src="" id="preview" alt=""  accept="image/*"/>
            <span>Profile+</span>
          </label>
          <input style={{ "display": 'none'}} type='file' name='img' id="file"  onChange={(e)=>previewImage(e)}/>
          <input type="text" name='username' placeholder='username' required/>
          <input type="email" name='email' placeholder='email' required/>
          <input type="password" name='password' placeholder='password' required/>
          <button>Sign up</button>
        </form>
        <p>You already have account? <Link to='/login'> Login</Link></p>
      </div>
    </div>
  )
}
export default Signup
