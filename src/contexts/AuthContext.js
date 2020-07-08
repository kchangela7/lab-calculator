import React, { createContext, useState } from 'react'
import { auth } from '../firebase';

export const AuthContext = createContext()

const AuthContextProvider = (props) => {
  const [open, setOpen] = useState(false); // Auth dialogue open or not
  const [user, setUser] = useState(null); // User variable

  // Track change in user state
  auth().onAuthStateChanged((firebaseUser) => {
    setUser(firebaseUser);
    if (firebaseUser) {
      setOpen(false);
    }
  })
  
  const openAuth = () => {
    setOpen(true);
  }
  const closeAuth = () => {
    setOpen(false);
  }

  return (
    <AuthContext.Provider value={{ user, open, openAuth, closeAuth }}>
      {props.children}
    </AuthContext.Provider>
  )
};

export default AuthContextProvider