import React from 'react';
import '../styles/ui.css';
// import {signInWithGoogle } from "./Firebase";

function App() {

  const onCancel = () => {
    parent.postMessage({ pluginMessage: { type: 'cancel' } }, '*');
  };

  return (
    <div>
      <h2>Figma Auth Test</h2>
      <button id="create" onClick={onCancel}>
        Sign In With Google
      </button>
      <br/>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
}

export default App;
