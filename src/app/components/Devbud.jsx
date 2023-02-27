import React, { useEffect } from 'react';
import { useState } from 'react';
import Button from './Button'
import { logOut } from './Firebase';
import styles from '../ui.module.scss';

const Devbud = () => {

  const [imageURL, setImageURL] = useState("");

    const clone = () => {
      parent.postMessage({ pluginMessage: { type: 'clone' } }, '*');
    };

    useEffect(() => {
      // This is how we read messages sent from the plugin controller
      window.onmessage = (event) => {
        
        let imgData=event.data.pluginMessage?.bytesData
  
        // var arrayBufferView = new Uint8Array(imgData);
  
        // var blob = new Blob([arrayBufferView], { type: "image/png" });
        // var urlCreator = window.URL || window.webkitURL;
        // var imageUrl = urlCreator.createObjectURL(blob);
      
  
  
  
        const uint8ToBase64 = (imgData) =>
      btoa(
          Array(imgData.length)
              .fill('')
              .map((_, i) => String.fromCharCode(imgData[i]))
              .join('')
      );
  
      let uint8data=uint8ToBase64(imgData)
      const finalEncodedData = `data:image/*;base64,${uint8data}`
      setImageURL(finalEncodedData)
      }
  
  
    }, []);
    

  return (
    <div className={styles.devbudContainer}>
        <h2>Congrats! Logged in Successfully</h2>
        <Button onClick={clone}>Clone</Button>
        {imageURL ? 
        <img className={styles.image} src={imageURL} alt="Component" /> : <></> }
    </div>
  )
}

export default Devbud