import React, { createContext, useState } from 'react'

export const LoadingContext = createContext()

const LoadingContextProvider = (props) => {
  const [isLoading, setIsLoading] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("")

  const displayFeedback = (type, message) => {
    if (type === "loading") {
      setIsLoading(message);
    } else if (type === "success") {
      setSuccess(message);
    } else if (type === "error") {
      setError(message);
    } else if (type === "reset") {
      setIsLoading(message);
      setSuccess(message);
      setError(message);
    }
  }

  return (
    <LoadingContext.Provider value={{ isLoading, success, error, displayFeedback }}>
      {props.children}
    </LoadingContext.Provider>
  )
};

export default LoadingContextProvider