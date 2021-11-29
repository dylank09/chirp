import React from "react";

import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firestore = firebase.firestore();
const auth = firebase.auth();

async function AddUserToDB(name) {
  const usersRef = firestore.collection("users");
  await usersRef.add({
    email: auth.currentUser.email,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    uid: auth.currentUser.uid,
    photoURL: auth.currentUser.photoURL,
    name: name ? name : auth.currentUser.displayName,
  });
}

export default AddUserToDB;
