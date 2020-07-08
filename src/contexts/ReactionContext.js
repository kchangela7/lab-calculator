import React, { createContext, useState } from 'react'
import { ReactionMix } from '../models/ReactionMix';

export const ReactionContext = createContext()

const ReactionContextProvider = (props) => {
  const [mix, setMix] = useState(new ReactionMix(0,0,0,0,0,0,0));
  const [open, setOpen] = useState(false);
  const [selectedMix, setSelectedMix] = useState({name: "A", data: new ReactionMix(50, 20, 2, 10, 7, 7, 2.3)})

  const openCreate = () => {
    setOpen(true);
  }
  
  const closeCreate = () => {
    setOpen(false);
  }

  return (
    <ReactionContext.Provider value={{ selectedMix, setSelectedMix, mix, setMix, open, openCreate, closeCreate }}>
      {props.children}
    </ReactionContext.Provider>
  )
};

export default ReactionContextProvider