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
  const [externalPopup, setExternalPopup] = useState(null);
  const [userData, setUserData] = useState(null);
  

  // const countRef = React.useCallback((element) => {
  //   if (element) element.value = '5';
  //   textbox.current = element;
  // }, []);

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
    setAuth(true);
}


  //   useEffect(() => {
  //     if (!externalPopup) {
  //       return;
  //     }
  
  //     const timer = setInterval(() => {
  //       if (!externalPopup) {
  //         timer && clearInterval(timer);
  //         return;
  //       }
  //       const currentUrl = externalPopup.location.href;
  //       if (!currentUrl) {
  //         return;
  //       }
  //       const authorizationCode = new URLSearchParams(window.location.search).get('code');
  //       if (authorizationCode) {
  //         setAuth(true)
  //         externalPopup.close();
  //         console.log(`The popup URL has URL code param = ${code}`);
  //         // YourApi.endpoint(code).then(() => {
  //         //   setAuth(true);
  //         // })
  //         //   .catch(() => {
  //         //     // API error
  //         //   })
  //         //   .finally(() => {
  //         //     // clear timer at the end
  //         //     setExternalPopup(null);
  //         //     timer && clearInterval(timer);
  //         //   })
          
  //       }
  //     }, 500)
  //   },
  //   [externalPopup]
  // )


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

