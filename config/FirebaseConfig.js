import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDS6ewZ9HDXhwN8u6qzsXmsijtv-5GFcrM",
  authDomain: "chirp-77b9d.firebaseapp.com",
  databaseURL:
    "https://chirp-77b9d-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "chirp-77b9d",
  storageBucket: "chirp-77b9d.appspot.com",
  messagingSenderId: "875721758742",
  appId: "1:875721758742:web:96ae1de3b28abdf608bd37",
  measurementId: "G-S4YZ6D7KW9",
};

export default firebase.initializeApp(firebaseConfig);
