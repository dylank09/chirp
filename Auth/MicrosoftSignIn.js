import firebase from "firebase/app";
import "firebase/auth";

export default function MicrosoftSignIn(navigation, next) {
  var provider = new firebase.auth.OAuthProvider("microsoft.com");
  provider.setCustomParameters({
    prompt: "consent",
    // audience: "common",
    tenant: "common",
  });
  firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      // IdP data available in result.additionalUserInfo.profile.
      // ...

      /** @type {firebase.auth.OAuthCredential} */
      var credential = result.credential;

      // OAuth access and id tokens can also be retrieved:
      //   var accessToken = credential.accessToken;
      //   var idToken = credential.idToken;
      navigation.navigate(next);
    })
    .catch((error) => {
      // Handle error.
      console.log(error);
    });
}
