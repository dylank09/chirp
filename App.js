import React from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { theme } from "./assets/Theme";
import Login from "./auth/Login";
import Register from "./auth/Register";
import ChirpGroups from "./chat/ChirpGroups";

import firebase from "firebase/app";
import "firebase/auth";
import app from "./config/Firebase";

// Initialize Firebase

const auth = firebase.auth(app);
var currentUser = null;
auth.onAuthStateChanged((user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    currentUser = user.email;
    // ...
  } else {
    // User is signed out
    // ...
  }
});

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer style={styles.container}>
      <Stack.Navigator initialRouteName={currentUser ? "ChirpGroups" : "Login"}>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ChirpGroups"
          component={ChirpGroups}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
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
