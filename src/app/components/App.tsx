import React from 'react';
import '../styles/ui.css';
import {signInWithGoogle } from "./Firebase";

function App() {

  const onCancel = () => {
    parent.postMessage({ pluginMessage: { type: 'cancel' } }, '*');
  };

  return (
    <div>
      <h2>Rectangle Creator</h2>
      <button id="create" onClick={signInWithGoogle}>
        Create
      </button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
}

export default App;
