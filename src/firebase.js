import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA78wDrtvsF9eJN4KJAukPdV4tcq7mbUQQ",
  authDomain: "lab-calculator-44198.firebaseapp.com",
  databaseURL: "https://lab-calculator-44198.firebaseio.com",
  projectId: "lab-calculator-44198",
  storageBucket: "lab-calculator-44198.appspot.com",
  messagingSenderId: "1042071825478",
  appId: "1:1042071825478:web:b47a19d02406291f57ae47"
};

firebase.initializeApp(firebaseConfig);
export var auth = firebase.auth;
export var db = firebase.firestore;