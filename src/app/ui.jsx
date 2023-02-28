import React, { useEffect } from 'react';
import styles from './ui.module.scss';

import Button from './components/Button';
import Devbud from './components/Devbud';
import { useState } from 'react';
// import { signInWithGoogle, logOut } from './components/Firebase';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";


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



  // const firebaseGoogleLogin = async () => {
  //   const result =  await signInWithGoogle();
  //     setUserName(result?.user?.displayName);
  //     setPhotoURL(result?.user?.photoURL);
  //     console.log(result)
  //     if(result) {
  //       setAuth(true)
  //     }
  //   }


  return (
    <div className={styles.Container}>
      {!auth ?

        <div className={styles.loginContainer}>
          <h2 className={styles.Title}>Login to DevBud</h2>
        
          <div className={styles.buttonContainer}>
            <Button onClick={googleLogin}>Login with Google</Button>
            {/* <Button onClick={signUp}>Sign Up</Button> */}
            {/* <Button onClick={signIn}>Sign In</Button> */}
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

