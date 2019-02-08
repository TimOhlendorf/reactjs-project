import Rebase from 're-base';
// firebase package 
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyACAYukcftw5P5a-vxRB6h0sv5TghODzGk",
    authDomain: "catch-of-the-day-74487.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-74487.firebaseio.com"
  });

const base = Rebase.createClass(firebaseApp.database());


// This is a named export
export {firebaseApp};

export default base; 
