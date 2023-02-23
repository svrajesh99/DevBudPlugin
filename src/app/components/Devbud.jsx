import React from 'react'
import Button from './Button'
import { logOut } from './Firebase';

const Devbud = () => {

    const signOut = () => {
        logOut();
      }

  return (
    <div>
        <h2>Congrats! Logged in Successfully</h2>
        {/* <Button onClick={signOut}>Log Out</Button> */}
    </div>
  )
}

export default Devbud