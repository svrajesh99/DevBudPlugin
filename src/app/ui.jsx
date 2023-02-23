import React from 'react';
import styles from './ui.module.scss';

import Button from './components/Button';
import Devbud from './components/Devbud';
import {useState} from 'react';
import { signInWithGoogle, logOut } from './components/Firebase';
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";


const UI = ({}) => {

  const [email,setEmail] = useState();
  const [password,setPassword] = useState();
  const [auth,setAuth] = useState(false);
  const mainAuth = getAuth();

  // const countRef = React.useCallback((element) => {
  //   if (element) element.value = '5';
  //   textbox.current = element;
  // }, []);

  const signUp = () => {
    console.log(email)
    signUpWithEmail(mainAuth,email,password)
  };

  const signUpWithEmail = async (mainAuth,email,password) => {
    const res =  await createUserWithEmailAndPassword(mainAuth, email, password);
    if(res) {
      setAuth(true)
  }
    setEmail("")
    setPassword("")
   };

   const signIn = () => {
    console.log(email)
    signInWithEmail(mainAuth,email,password)
  };


  const signInWithEmail = async (mainAuth,email,password) => {
    const res =  await signInWithEmailAndPassword(mainAuth, email, password);
    if(res) {
      setAuth(true)
  }
    setEmail("")
    setPassword("")
   };


  const googleLogin = async () => {
    const result =  await signInWithGoogle();
      setUserName(result?.user?.displayName);
      setPhotoURL(result?.user?.photoURL);
      console.log(result)
      if(result) {
        setAuth(true)
      }
    }

  // const onCancel = () => {
  //   parent.postMessage({ pluginMessage: { type: 'cancel' } }, '*');
  // };

  // React.useEffect(() => {
  //   // This is how we read messages sent from the plugin controller
  //   window.onmessage = (event) => {
  //     const { type, message } = event.data.pluginMessage;
  //     if (type === 'create-rectangles') {
  //       console.log(`Figma Says: ${message}`);
  //     }
  //   };
  // }, []);

  return (
<div>
    { !auth ? 

    <div className={styles.container}>
    <h2>Login to DevBud</h2>
    <p>
      Email: <input required onChange={(e) => setEmail(e.target.value)} value={email} placeholder="Enter Your Email" type="text" />
    </p>
    <p>
      Password: <input required onChange={(e) => setPassword(e.target.value)} value={password} placeholder="Enter your password" type="password" />
    </p>
    <div className={styles.buttonContainer}>


      <Button onClick={signUp}>Sign Up</Button>
      <Button onClick={signIn}>
        Sign In
      </Button>
    </div>
  </div> : <Devbud/>}

  </div>
    
    
  );
};

export default UI;

