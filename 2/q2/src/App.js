import React, { useState } from 'react';
import Login from './Components/Login';
import LoginSignup from './Components/LoginSignup';
import Signup from './Components/Signup';
import styles from './App.module.css'

const App = () => {
  const[isSignedUp,setIsSignedUp] = useState(false)
  return (
    <div className={styles.container}>
      <LoginSignup login={() => setIsSignedUp(true)} signup={() => setIsSignedUp(false)}/>
      {isSignedUp?<Login/>:<Signup/>}
    </div>
  );
};

export default App;