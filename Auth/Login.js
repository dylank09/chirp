import React, { useState } from "react";
import {
  StyleSheet,
  Image,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
} from "react-native";

import { theme } from "../assets/Theme";
import logo from "../assets/logo.png";
import ChirpButton from "../components/ChirpButton";
import ChirpTextBox from "../components/ChirpTextBox";
import TextAlert from "../components/TextAlert";
import AuthProviderButton from "../components/AuthProviderButton";
import GoogleSignIn from "./GoogleSignIn";

import auth from "../config/FirebaseAuthInit";

export default function Login({ navigation }) {
  // we use useStates so that whenever a state (e.g. email) changes, the componenent re-renders
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  function signInEmailPass() {
    // we attempt to sign in with email and password provided by user
    // firebase return different error codes that we use to display custom errors to user
    auth.signInWithEmailAndPassword(email, password).catch((error) => {
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
    // use navigation prop (prop is provided automatically when using stack navigator)
    navigation.navigate("Register");
  }

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.logo} source={logo}></Image>
      <Text style={styles.headingText}>Sign In</Text>
      <KeyboardAvoidingView style={styles.inputContainer} behavior="padding">
        <ChirpTextBox
          placeholder="Email"
          onChangeText={setEmail}
        ></ChirpTextBox>
        <TextAlert text={emailError}></TextAlert>
        <ChirpTextBox
          placeholder="Password"
          onChangeText={setPassword}
          password={true}
        ></ChirpTextBox>
        <TextAlert text={passwordError}></TextAlert>
        <ChirpButton
          text="Continue"
          testID="loginButton"
          onPress={signInEmailPass}
          width="40%"
        ></ChirpButton>
      </KeyboardAvoidingView>
      <Text style={styles.orText}>or</Text>
      <AuthProviderButton
        text="Sign in with Google"
        testID="googleButton"
        type="google"
        onPress={() => GoogleSignIn()}
      ></AuthProviderButton>
      <Text
        style={styles.registerText}
        onPress={navToRegister}
        testID="navToRegisterButton"
      >
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
    justifyContent: "space-around",
  },
  inputContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40,
  },
  headingText: {
    fontSize: 28,
    color: theme.colors.text,
    marginBottom: 15,
  },
  logo: {
    width: 120,
    height: 120,
    padding: 0,
    marginBottom: 15,
  },
  orText: {
    fontSize: theme.dimensions.standardFontSize,
    color: theme.colors.text,
    width: "40%",
    textAlign: "center",
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.text,
  },
  registerText: {
    color: theme.colors.placeholderColor,
    fontSize: theme.dimensions.standardFontSize,
    marginBottom: 10,
    textDecorationLine: "underline",
  },
});
