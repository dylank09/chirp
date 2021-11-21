import React, { useState } from "react";
import { StyleSheet, Image, Text, View, SafeAreaView } from "react-native";

import { theme } from "../assets/Theme";
import logo from "../assets/logo.png";
import ChirpButton from "../components/ChirpButton";
import AuthTextBox from "../components/AuthTextBox";
import AuthAlert from "../components/AuthAlert";
import GoogleButton from "../components/GoogleButton";

import firebase from "firebase/app";
import "firebase/auth";
import GoogleSignIn from "./GoogleSignIn";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  function signInEmailPass() {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        navigation.navigate("Register");
        // set currentUser in the App to some value in order to render the main screen?
      })
      .catch((error) => {
        console.log(error);
        if (error.code == "auth/invalid-email")
          setEmailError("Email address is not valid.");
        else if (error.code == "auth/user-not-found")
          setEmailError("User not found.");
        else if (error.code == "auth/wrong-password")
          setPasswordError("Incorrect credentials given.");
        else {
          setEmailError("Incorrect details. Try again.");
        }
      });
  }

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.logo} source={logo}></Image>
      <Text style={styles.headingText}>Sign In</Text>
      <AuthTextBox placeholder="Email" onChangeText={setEmail}></AuthTextBox>
      <AuthAlert text={emailError}></AuthAlert>
      <AuthTextBox
        placeholder="Password"
        onChangeText={setPassword}
      ></AuthTextBox>
      <AuthAlert text={passwordError}></AuthAlert>
      <ChirpButton text="Continue" onPress={signInEmailPass}></ChirpButton>
      <Text style={styles.orText}>or</Text>
      <View style={styles.line} />
      <GoogleButton
        onPress={() => GoogleSignIn(navigation, "Register")}
      ></GoogleButton>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: theme.colors.background,
    alignItems: "center",
    justifyContent: "center",
  },
  headingText: {
    fontSize: 28,
    color: theme.colors.text,
    marginBottom: 70,
  },
  orText: {
    fontSize: theme.dimensions.standardFontSize,
    color: theme.colors.text,
    marginTop: 20,
  },
  logo: {
    width: 130,
    height: 130,
    padding: 0,
    marginTop: 0,
    marginBottom: 40,
  },
  line: {
    borderBottomColor: theme.colors.text,
    borderBottomWidth: 1,
    width: "50%",
  },
});
