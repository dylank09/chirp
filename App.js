import React from "react";
import { StyleSheet, View } from "react-native";

import { theme } from "./assets/Theme";
import AppContainer from "./AppContainer";
import AuthContainer from "./auth/AuthContainer";
import LoadingScreen from "./LoadingScreen";

import { useAuthState } from "react-firebase-hooks/auth";
import "firebase/auth";
import firebase from "./config/FirebaseConfig";

const auth = firebase.auth();

export default function App() {
  const [user, loading] = useAuthState(auth);

  console.log(user);

  if (loading) {
    return <LoadingScreen />;
  }

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
