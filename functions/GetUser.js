import React from "react";

import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

const firestore = firebase.firestore();

function GetUser(id) {
  const usersRef = firestore.collection("users");

  const [users] = useCollectionData(usersRef, { idField: "userid" });

  if (users) {
    for (const u of users) {
      if (id == u.userid) {
        return u.email;
      }
    }
  }
  return null;
}

export default GetUser;
