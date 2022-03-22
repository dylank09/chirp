import firebase from "../config/FirebaseInit";
import firestore from "../config/FirestoreInit";
import auth from "../config/FirebaseAuthInit";

async function AddUserToDB(name) {
  const usersRef = firestore.collection("users");
  await usersRef.doc(auth.currentUser.uid).set({
    email: auth.currentUser.email,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    name: name ? name : auth.currentUser.displayName,
  });
}

export default AddUserToDB;
