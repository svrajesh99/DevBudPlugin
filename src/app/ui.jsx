import React, { useEffect } from 'react';
import styles from './ui.module.scss';
import Button from './components/Button';
import Devbud from './components/Devbud';
import { useState } from 'react';
import axios from 'axios';


const UI = ({ }) => {

  const [auth, setAuth] = useState(false);
  const [userData, setUserData] = useState();



  const googleLogin = () => {
    parent.postMessage({ pluginMessage: { type: 'login' } }, '*');
}

useEffect(() => {
  // This is how we read messages sent from the plugin controller
  window.onmessage = (event) => {
    
    let windowURL = event.data.pluginMessage?.windowURL;
    let pollURL = event.data.pluginMessage?.pollURL;
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
        setAuth(true);
        console.log(acTK);

        const url = 'https://api.bud.dev2staging.com/v1/users/me';

          axios.get(url, {
            headers: {
              'Authorization': `Bearer ${acTK}`
            }
          })
          .then(response => {
            setUserData(response.data.data);
            console.log(userData)
            console.log(response.data.data)
          })
          .catch(error => {
            console.log(error);
          });
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

