import React from "react";
import { StyleSheet, View } from "react-native";

import { theme } from "./assets/Theme";
import AppContainer from "./AppContainer";
import AuthContainer from "./auth/AuthContainer";

import firebase from "firebase/app";
import { useAuthState } from "react-firebase-hooks/auth";
import "firebase/auth";
import firebaseConfig from "./config/FirebaseConfig";

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

export default function App() {
  const [user] = useAuthState(auth);

  console.log(user);

  return (
    <View style={styles.container}>
      {user ? <AppContainer /> : <AuthContainer />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
});
