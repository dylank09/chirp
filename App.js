import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import { theme } from "./assets/Theme";

import firebase from "firebase/app";
import { firebaseConfig } from "./config/FirebaseConfig";

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

export default function App() {
  return (
    <NavigationContainer theme={theme}>
      <View style={styles.container}>
        <Text style={styles.text}>HEY</Text>
      </View>
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
  text: {
    color: theme.colors.text,
  },
});
