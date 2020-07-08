import React from 'react';
import './App.css';
import ButtonAppBar from './components/ButtonAppBar';
import PCRCalculator from './components/PCR/PCRCalculator';
import CalculatorContextProvider from './contexts/CalculatorContext';
import ReactionContextProvider from './contexts/ReactionContext';
import AuthContextProvider from './contexts/AuthContext';
import Authenticate from './components/Authentication/Authenticate';
import LoadingContextProvider from './contexts/LoadingContext';
import Loading from './shared/Loading';

function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <ButtonAppBar />
        <LoadingContextProvider>
          <CalculatorContextProvider>
            <ReactionContextProvider>
              <PCRCalculator />
              <Authenticate />
              <Loading />
            </ReactionContextProvider>
          </CalculatorContextProvider>
        </LoadingContextProvider>
      </AuthContextProvider>
    </div>
  );
}

export default App;
