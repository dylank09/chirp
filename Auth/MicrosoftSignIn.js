import firebase from "firebase/app";
import "firebase/auth";

export default function MicrosoftSignIn(navigation, next) {
  //   var provider = new firebase.auth.GoogleAuthProvider();
  //   firebase
  //     .auth()
  //     .signInWithPopup(provider)
  //     .then((result) => {
  //       /** @type {firebase.auth.OAuthCredential} */
  //       //   var credential = result.credential;
  //       // This gives you a Google Access Token use it to access the Google API
  //       //   var token = credential.accessToken;
  //       // The signed-in user info.
  //       //   var user = result.user;
  //       navigation.navigate(next);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       //   var errorCode = error.code;
  //       //   var errorMessage = error.message;
  //       // The email of the user's account used.
  //       // var email = error.email;
  //       // The firebase.auth.AuthCredential type that was used.
  //       // var credential = error.credential;
  //       // ...
  //     });
}
