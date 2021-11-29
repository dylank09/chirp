import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDI5TLvpo2EW-DORkzce0SRtY6la0C6Rts",
  authDomain: "chirp-c5c07.firebaseapp.com",
  databaseURL:
    "https://chirp-c5c07-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "chirp-c5c07",
  storageBucket: "chirp-c5c07.appspot.com",
  messagingSenderId: "623601996602",
  appId: "1:623601996602:web:30653c73b6f4254acff603",
  measurementId: "G-635KBY2MX9",
};

export default firebase.initializeApp(firebaseConfig);
