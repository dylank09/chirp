import React from "react";

import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firestore = firebase.firestore();
const auth = firebase.auth();

async function AddUserToDB(name) {
  const usersRef = firestore.collection("users");
  await usersRef.doc(auth.currentUser.uid).set({
    email: auth.currentUser.email,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    photoURL: auth.currentUser.photoURL,
    name: name ? name : auth.currentUser.displayName,
    joinedChats: null,
  });
}

export default AddUserToDB;
