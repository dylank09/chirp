import { Platform } from "react-native";
import * as GoogleAuthentication from "expo-google-app-auth";

import AddUserToDB from "../functions/AddUserToDB";

import firebase from "firebase/app";
import "firebase/auth";

export default function GoogleSignIn() {
  if (Platform.OS === "web") {
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope("profile");
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        AddUserToDB();
      })
      .catch((error) => {
        console.log(error);
      });
  } else if (Platform.OS === "android" || Platform.OS === "ios") {
    GoogleAuthentication.logInAsync({
      androidStandaloneAppClientId:
        "875721758742-9b11vs4d5un4t600bjtktp0ra5uctcqh.apps.googleusercontent.com",
      iosStandaloneAppClientId:
        "875721758742-i63ci73jfcunr66lb5v5q7tdeudrata9.apps.googleusercontent.com",
      scopes: ["profile", "email"],
    })
      .then((logInResult) => {
        if (logInResult.type === "success") {
          const { idToken, accessToken } = logInResult;
          const credential = firebase.auth.GoogleAuthProvider.credential(
            idToken,
            accessToken
          );

          return firebase.auth().signInWithCredential(credential);
        }
        return Promise.reject();
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
