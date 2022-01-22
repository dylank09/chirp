import firebase from "firebase/app";
import "firebase/firestore";

import app from "../config/FirebaseConfig";

export default firebase.firestore(app);
