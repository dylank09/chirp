import React, { useState } from "react";
import { StyleSheet, Image, Text, View } from "react-native";

import { theme } from "../assets/Theme";
import logo from "../assets/logo.png";
import Button from "../components/Button";

import firebase from "firebase/app";
import "firebase/auth";
import AuthTextBox from "../components/AuthTextBox";
import AuthAlert from "../components/AuthAlert";
import GoogleButton from "../components/GoogleButton";

export default function Register() {
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

  function createUserGoogle() {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        var credential = result.credential;

        // This gives you a Google Access Token use it to access the Google API
        var token = credential.accessToken;
        // The signed-in user info.
        var user = result.user;
      })
      .catch((error) => {
        console.log(error);
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        // var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        // var credential = error.credential;
        // ...
      });
  }

  return (
    <View style={styles.container}>
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
      <Button
        style={styles.continueButton}
        text="Continue"
        onPress={createUserEmailPass}
      ></Button>
      <Text style={styles.orText}>or</Text>
      <View style={styles.line} />
      <GoogleButton onPress={createUserGoogle}></GoogleButton>
    </View>
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
