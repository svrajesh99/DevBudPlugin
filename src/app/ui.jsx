import React, { useEffect } from 'react';
import styles from './ui.module.scss';
import Button from './components/Button';
import Devbud from './components/Devbud';
import { useState } from 'react';
// import { signInWithGoogle, logOut } from './components/Firebase';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import useWebSocket from 'react-use-websocket';


const UI = ({ }) => {

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [auth, setAuth] = useState(false);
  const mainAuth = getAuth();
  const [userData, setUserData] = useState(null);
  const [accessToken,setAccessToken] = useState(null);
  

  const signUp = () => {
    console.log(email)
    signUpWithEmail(mainAuth, email, password)
  };

  const signUpWithEmail = async (mainAuth, email, password) => {
    const res = await createUserWithEmailAndPassword(mainAuth, email, password);
    if (res) {
      setAuth(true)
    }
    setEmail("")
    setPassword("")
  };

  const signIn = () => {
    console.log(email)
    signInWithEmail(mainAuth, email, password)
  };


  const signInWithEmail = async (mainAuth, email, password) => {
    const res = await signInWithEmailAndPassword(mainAuth, email, password);
    console.log(res);
    if (res) {
      setAuth(true)
    }
    setEmail("")
    setPassword("")
  };

  const googleLogin = () => {
    parent.postMessage({ pluginMessage: { type: 'login' } }, '*');
}

useEffect(() => {
  // This is how we read messages sent from the plugin controller
  window.onmessage = (event) => {
    
    let windowURL =event.data.pluginMessage?.windowURL;
    let pollURL =event.data.pluginMessage?.pollURL;
    console.log(windowURL)
    console.log(pollURL)
    window.open(windowURL)

    let acTK = null;
    let rfTK = null;

     async function fetchAccessToken() {
      if(!acTK ) {
        const res = await fetch(pollURL);
        const data = await res.json();
        acTK = data.data.accessToken;
        rfTK = data.data.refreshToken;
      }
      else {
        clearInterval(fetchAccessTokenTimer);
        console.log("Access Token", acTK)
        console.log("Refresh Token", rfTK)
        setAccessToken(acTK);
        setAuth(true);
      }
    }

    const fetchAccessTokenTimer = setInterval(fetchAccessToken, 1000);
  }


}, []);


  return (
    <div className={styles.Container}>
      {!auth ?

        <div className={styles.loginContainer}>
          <h4 className={styles.Title}>Experience the AI revolution inside Figma</h4>

        <div className={styles.loginFields}>

          <div className={styles.inputField}> 
          <input type="email" placeholder="Your email" />
          </div>

          <div className={styles.inputField}>
          <input className={styles.input} type="password" placeholder="Your API key" />
          </div>

        </div>

        <p className={styles.link}>How to get an API Key?</p>
        
          <div className={styles.buttonContainer}>
            <Button onClick={googleLogin}>Login to DevBud</Button>
          </div>
        </div> : <Devbud />}

    </div>


  );
};

export default UI;


{/* <div className={styles.loginFields}> 
          <p>
           <input className={styles.input} required onChange={(e) => setEmail(e.target.value)} value={email} placeholder="Enter Your Email" type="text" />
          </p>
          <p>
           <input className={styles.input} required onChange={(e) => setPassword(e.target.value)} value={password} placeholder="Enter your password" type="password" />
          </p> 
          </div> */}

