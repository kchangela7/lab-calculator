import React, { createContext, useState } from 'react'

export const CalculatorContext = createContext()

const CalculatorContextProvider = (props) => {
  const [data, setData] = useState({
    wells: [[]], amount: 0, displayResult: false
  });
  const newData = (wells, amount) => {
    setData({ wells, amount, displayResult: true})
  }
  return (
    <CalculatorContext.Provider value={{ ...data, newData }}>
      {props.children}
    </CalculatorContext.Provider>
  )
};

export default CalculatorContextProvider