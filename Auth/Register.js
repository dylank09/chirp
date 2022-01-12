import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
} from "react-native";

import { theme } from "../assets/Theme";
import ChirpButton from "../components/ChirpButton";
import ChirpTextBox from "../components/ChirpTextBox";
import TextAlert from "../components/TextAlert";
import AuthProviderButton from "../components/AuthProviderButton";

import firebase from "../config/FirebaseConfig";
import "firebase/auth";
import GoogleSignIn from "./GoogleSignIn";
import AddUserToDB from "../functions/AddUserToDB";

export default function Register({ navigation }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const next = "ChirpGroups";

  function createUserEmailPass() {
    if (validateName() && validatePassword()) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          setEmailError("");
          // Signed in
          // var user = userCredential.user;
          AddUserToDB(fullName);
          navigation.navigate(next);
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
      <Text style={styles.headingText}>Register</Text>
      <KeyboardAvoidingView style={styles.inputContainer} behavior="padding">
        <ChirpTextBox
          placeholder="Full name"
          onChangeText={setFullName}
        ></ChirpTextBox>
        <TextAlert text={nameError}></TextAlert>
        <ChirpTextBox
          placeholder="Email"
          onChangeText={setEmail}
        ></ChirpTextBox>
        <TextAlert text={emailError}></TextAlert>
        <ChirpTextBox
          placeholder="Password"
          onChangeText={setPassword}
        ></ChirpTextBox>
        <TextAlert text={passwordError}></TextAlert>
        <ChirpTextBox
          placeholder="Confirm password"
          onChangeText={setConfirmPassword}
        ></ChirpTextBox>
      </KeyboardAvoidingView>
      <ChirpButton
        style={styles.continueButton}
        text="Continue"
        onPress={createUserEmailPass}
        width="40%"
      ></ChirpButton>
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
        onPress={() => GoogleSignIn(navigation, next)}
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
    justifyContent: "space-between",
  },
  inputContainer: {
    flex: 2,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  headingText: {
    flex: 0.5,
    fontSize: 24,
    color: theme.colors.text,
    marginTop: 15,
    marginBottom: 10,
  },
  orText: {
    fontSize: theme.dimensions.standardFontSize,
    color: theme.colors.text,
  },
  line: {
    borderBottomColor: theme.colors.text,
    borderBottomWidth: 1,
    marginBottom: 7,
    width: "50%",
  },
  loginText: {
    flex: 0.3,
    color: theme.colors.placeholderColor,
    fontSize: theme.dimensions.standardFontSize,
    marginTop: 8,
    marginBottom: 5,
    textDecorationLine: "underline",
  },
});
