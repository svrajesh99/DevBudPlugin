import { initializeApp } from 'firebase/app';

import {
    GoogleAuthProvider,
    getAuth,
    signOut,
    signInWithPopup
  } from "firebase/auth"



const firebaseConfig = {
    apiKey: "AIzaSyBdlKPdu6ay8FHV5c4adHoe_gqOaEEroW4",
    authDomain: "authtestfigma.firebaseapp.com",
    projectId: "authtestfigma",
    storageBucket: "authtestfigma.appspot.com",
    messagingSenderId: "236293878739",
    appId: "1:236293878739:web:492a006b7a32fcbcc43526"
  };


  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  const googleProvider = new GoogleAuthProvider();

  const signInWithGoogle = async() => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      const user = res.user;
      console.log(user);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const logout = () => {
    signOut(auth);
  };

  export {
    auth,
    signInWithGoogle,
    logout
  };
