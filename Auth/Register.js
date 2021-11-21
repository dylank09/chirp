import React, { useState } from "react";
import { StyleSheet, Image, Text, View, SafeAreaView } from "react-native";

import { theme } from "../assets/Theme";
import logo from "../assets/logo.png";
import ChirpButton from "../components/ChirpButton";
import AuthTextBox from "../components/AuthTextBox";
import AuthAlert from "../components/AuthAlert";
import AuthProviderButton from "../components/AuthProviderButton";

import firebase from "firebase/app";
import "firebase/auth";
import GoogleSignIn from "./GoogleSignIn";

export default function Register({ navigation }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  function createUserEmailPass() {
    if (validateName() && validatePassword()) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          setEmailError("");
          // Signed in
          // var user = userCredential.user;

          navigation.navigate("Login");
          // set currentUser in the App to some value in order to render the main screen?
        })
        .catch((error) => {
          console.log(error);
          switch (error.code) {
            case "auth/invalid-email":
              setEmailError("Email address is not valid.");
              break;
            case "auth/blablabla":
              setEmailError("User already exists.");
              break;
            default:
              setEmailError("Incorrect details. Try again.");
          }
        });
    }
  }

  function validatePassword() {
    var check = false;
    if (password.length < 8) {
      setPasswordError("Password is too short.");
    } else if (!(/[A-Z]/.test(password) && /[0-9]/.test(password))) {
      setPasswordError("Password must include a capital and a number.");
    } else if (password != confirmPassword) {
      setPasswordError("Passwords don't match.");
    } else {
      setPasswordError("");
      check = true;
    }
    return check;
  }

  function validateName() {
    if (fullName.length < 2) {
      setNameError("Name is too short.");
      return false;
    } else {
      setNameError("");
      return true;
    }
  }

  function navToLogin() {
    navigation.navigate("Login");
  }

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.logo} source={logo}></Image>
      <Text style={styles.headingText}>Register</Text>
      <AuthTextBox
        placeholder="Full name"
        onChangeText={setFullName}
      ></AuthTextBox>
      <AuthAlert text={nameError}></AuthAlert>
      <AuthTextBox placeholder="Email" onChangeText={setEmail}></AuthTextBox>
      <AuthAlert text={emailError}></AuthAlert>
      <AuthTextBox
        placeholder="Password"
        onChangeText={setPassword}
      ></AuthTextBox>
      <AuthAlert text={passwordError}></AuthAlert>
      <AuthTextBox
        placeholder="Confirm password"
        onChangeText={setConfirmPassword}
      ></AuthTextBox>
      <ChirpButton
        style={styles.continueButton}
        text="Continue"
        onPress={createUserEmailPass}
      ></ChirpButton>
      <Text style={styles.orText}>or</Text>
      <View style={styles.line} />
      <AuthProviderButton
        text="Sign in with Google"
        type="google"
        onPress={() => GoogleSignIn(navigation, "Login")}
      ></AuthProviderButton>
      <AuthProviderButton
        text="Sign in with Microsoft"
        type="microsoft"
        // onPress={() => GoogleSignIn(navigation, "Register")}
      ></AuthProviderButton>
      <Text style={styles.loginText} onPress={navToLogin}>
        Already have an account? Sign in
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
  headingText: {
    flex: 1,
    fontSize: 28,
    color: theme.colors.text,
    marginBottom: 15,
  },
  orText: {
    fontSize: theme.dimensions.standardFontSize,
    color: theme.colors.text,
  },
  logo: {
    width: 130,
    height: 130,
    padding: 0,
    marginTop: 10,
    marginBottom: 15,
  },
  line: {
    borderBottomColor: theme.colors.text,
    borderBottomWidth: 1,
    marginBottom: 15,
    width: "50%",
  },
  loginText: {
    flex: 1,
    color: theme.colors.placeholderColor,
    fontSize: theme.dimensions.standardFontSize,
    marginTop: 10,
    textDecorationLine: "underline",
  },
});
