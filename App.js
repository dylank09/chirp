import React from "react";
import { StyleSheet, SafeAreaView } from "react-native";

import { theme } from "./assets/Theme";
import Login from "./auth/Login";
//import ChirpChat from "./chat/ChirpChat"...

import firebase from "firebase/app";
import { firebaseConfig } from "./config/FirebaseConfig";
import AuthTextBox from "./components/AuthTextBox";

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth(app);
var user = auth.currentUser;
console.log("Current user: " + user);

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      {user ? console.log("User logged in") : <Login />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    alignItems: "center",
    justifyContent: "center",
  },
});
