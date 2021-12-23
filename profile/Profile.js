import React from "react";
import { StyleSheet, Text, View } from "react-native";

import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

import { theme } from "../assets/Theme";
import app from "../config/FirebaseConfig";

const firestore = firebase.firestore(app);
const auth = firebase.auth();

export default function Profile() {
  return (
    <View style={styles.container}>
      <Text style={styles.signout} onPress={() => auth.signOut()}>
        Sign out
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    alignItems: "center",
  },
  signout: {
    fontSize: theme.dimensions.standardFontSize,
    color: theme.colors.text,
    width: "100%",
    borderBottomWidth: 0.5,
    borderBottomColor: theme.colors.jet,
    padding: 7,
  },
});
