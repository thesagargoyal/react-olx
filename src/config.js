import firebase from "firebase";

var firebaseConfig = {
    apiKey: "AIzaSyBgNKl3ys_V3wsE4IWW1XbZel4ulhyFICo",
    authDomain: "react-olx-d568b.firebaseapp.com",
    projectId: "react-olx-d568b",
    storageBucket: "react-olx-d568b.appspot.com",
    messagingSenderId: "42599809584",
    appId: "1:42599809584:web:7bfed4ec082ac71fc563f5"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);


const auth = firebaseApp.auth();
export default auth;