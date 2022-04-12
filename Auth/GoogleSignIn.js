import { Platform } from "react-native";
import * as GoogleAuthentication from "expo-google-app-auth";

import AddUserToDB from "../functions/AddUserToDB";

import firebase from "../config/FirebaseInit";
import "firebase/auth";

export default function GoogleSignIn() {
  // if its on a browser we use a different library than on an Android or iOS
  if (Platform.OS === "web") {
    // first we construct the google auth provider
    var provider = new firebase.auth.GoogleAuthProvider();
    // add google oauth scope to provider to include profile accounts
    provider.addScope("profile");

    // next we open a pop up for user to choose which google account to sign in with
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        // if user successfully signs in, add this user to the database and return true.
        AddUserToDB();
        return true;
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
  } else if (Platform.OS === "android" || "ios") {
    // here we provide the GoogleAuthentication module with the client ids for iOS and Android
    // the function logInAsync prompts the user to log in to their google account
    GoogleAuthentication.logInAsync({
      androidStandaloneAppClientId:
        "875721758742-9b11vs4d5un4t600bjtktp0ra5uctcqh.apps.googleusercontent.com",
      iosStandaloneAppClientId:
        "875721758742-i63ci73jfcunr66lb5v5q7tdeudrata9.apps.googleusercontent.com",
      scopes: ["profile", "email"],
    })
      .then((logInResult) => {
        if (logInResult.type === "success") {
          // if the login was successful, we must authenticate with firebase using the credentials
          // that were returned from the logInAsync funtion
          const { idToken, accessToken } = logInResult;
          const credential = firebase.auth.GoogleAuthProvider.credential(
            idToken,
            accessToken
          );

          // then we add the user to the database and return true
          AddUserToDB();
          firebase.auth().signInWithCredential(credential);
          return true;
        }
        return false;
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
  }
}
