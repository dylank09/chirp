import React, { useState } from "react";
import {
  StyleSheet,
  Image,
  Text,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
} from "react-native";

import { theme } from "../assets/Theme";
import logo from "../assets/logo.png";
import ChirpButton from "../components/ChirpButton";
import AuthTextBox from "../components/AuthTextBox";
import AuthAlert from "../components/AuthAlert";
import AuthProviderButton from "../components/AuthProviderButton";

import firebase from "firebase/app";
import "firebase/auth";
import GoogleSignIn from "./GoogleSignIn";
import MicrosoftSignIn from "./MicrosoftSignIn";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const next = "ChirpGroups";

  function signInEmailPass() {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        // var user = userCredential.user;
        navigation.navigate("ChirpGroups");
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

  function navToRegister() {
    navigation.navigate("Register");
  }

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.logo} source={logo}></Image>
      <Text style={styles.headingText}>Sign In</Text>

      <KeyboardAvoidingView style={styles.inputContainer} behavior="padding">
        <AuthTextBox placeholder="Email" onChangeText={setEmail}></AuthTextBox>
        <AuthAlert text={emailError}></AuthAlert>
        <AuthTextBox
          placeholder="Password"
          onChangeText={setPassword}
        ></AuthTextBox>
        <AuthAlert text={passwordError}></AuthAlert>
        <ChirpButton text="Continue" onPress={signInEmailPass}></ChirpButton>
      </KeyboardAvoidingView>
      <Text style={styles.orText}>or</Text>
      <View style={styles.line} />
      <AuthProviderButton
        text="Sign in with Google"
        type="google"
        onPress={() => GoogleSignIn(navigation, next)}
      ></AuthProviderButton>
      <AuthProviderButton
        text="Sign in with Microsoft"
        type="microsoft"
        onPress={() => MicrosoftSignIn(navigation, next)}
      ></AuthProviderButton>
      <Text style={styles.registerText} onPress={navToRegister}>
        Register new account
      </Text>
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
  inputContainer: {
    flex: 2,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  headingText: {
    flex: 1,
    fontSize: 28,
    color: theme.colors.text,
    marginBottom: 25,
    marginTop: 10,
  },
  logo: {
    width: 130,
    height: 130,
    padding: 0,
    marginTop: 10,
    marginBottom: 15,
  },
  orText: {
    fontSize: theme.dimensions.standardFontSize,
    color: theme.colors.text,
  },
  line: {
    borderBottomColor: theme.colors.text,
    borderBottomWidth: 1,
    marginBottom: 15,
    width: "50%",
  },
  registerText: {
    flex: 0.3,
    color: theme.colors.placeholderColor,
    fontSize: theme.dimensions.standardFontSize,
    marginTop: 10,
    marginBottom: 10,
    textDecorationLine: "underline",
  },
});
