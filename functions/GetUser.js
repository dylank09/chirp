import { useCollectionData } from "react-firebase-hooks/firestore";

import firestore from "../config/FirestoreInit";

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
