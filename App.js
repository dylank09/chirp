import React from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { theme } from "./assets/Theme";
import Login from "./auth/Login";
import Register from "./auth/Register";
//import ChirpChat from "./chat/ChirpChat"...

import firebase from "firebase/app";
import "firebase/auth";
import { firebaseConfig } from "./config/FirebaseConfig";
import ChirpGroups from "./chat/ChirpGroups";

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth(app);
var user = auth.currentUser;
console.log("Current user: " + user);

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer style={styles.container}>
      <Stack.Navigator initialRouteName={user ? "ChirpGroups" : "Login"}>
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
