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

/* A React website created for quickly calculating PCR MasterMix amounts and generating
a wells layout by taking in simple raw data (ie. sample numbers and control amounts). Backend built
using Firebase to add Authentication and Database access for user to create their own mix ratios.
This is my first project created during the summer of 2020 after taking the Intro to CS (Comp 110) at UNC 
during the Spring 2020 semester. I work in a genetics lab at UNC run by Dr. Koller, the PI of the lab. 
I built this for myself and others to use in the lab to aid in research. */

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
