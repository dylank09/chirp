import firebase from "firebase/app";
import AddUserToDB from "../functions/AddUserToDB";
import "firebase/auth";
import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";

export default function GoogleSignIn() {
  // try {
  //   const result = await Expo.Google.logInAsync({
  //     behavior: 'web',
  //     androidClientId: ,
  //     iosClientId: '623601996602-es7ru4t566nbkjbvbm8kaudtns42ihoj.apps.googleusercontent.com',
  //     scopes: ['profile', 'email'],
  //   })
  //   if(result.type === 'success'){
  //     return result.accessToken;
  //   } else {
  //     return { cancelled: true };
  //   }
  // } catch (error) {
  //   return {error: true}
  // }
  // var provider = new firebase.auth.GoogleAuthProvider();
  // provider.addScope("profile");
  // provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
  // firebase.auth().signInWithRedirect(provider);
  //ios : 623601996602-es7ru4t566nbkjbvbm8kaudtns42ihoj.apps.googleusercontent.com
  // firebase
  //   .auth()
  //   .getRedirectResult.then((result) => {
  //     /** @type {firebase.auth.OAuthCredential} */
  //     AddUserToDB();
  //     //   var credential = result.credential;
  //     // This gives you a Google Access Token use it to access the Google API
  //     //   var token = credential.accessToken;
  //     // The signed-in user info.
  //     //   var user = result.user;
  //     // firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //     //   var errorCode = error.code;
  //     //   var errorMessage = error.message;
  //     // The email of the user's account used.
  //     // var email = error.email;
  //     // The firebase.auth.AuthCredential type that was used.
  //     // var credential = error.credential;
  //     // ...
  //   });
}
