import React from "react";
import { StyleSheet, Text, View, ScrollView, Image } from "react-native";

import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

import { theme } from "../assets/Theme";
import app from "../config/FirebaseConfig";

const firestore = firebase.firestore(app);
const auth = firebase.auth();

export default function Profile() {
  const usersRef = firestore.collection("users");
  const query = usersRef.where("email", "==", auth.currentUser.email);
  const [user] = useCollectionData(query, { idField: "userid" });

  const { photoURL, displayName } = auth.currentUser;

  console.log(user);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileHeader}>
        {photoURL ? (
          <Image style={styles.profileImage} source={{ uri: photoURL }}></Image>
        ) : (
          <View style={styles.profileImage}>
            {user ? user[0].name.slice(0, 1) : ""}
          </View>
        )}
        <View style={styles.profileInfo}>
          <Text style={styles.displayName}>
            {user ? user[0].name : displayName}
          </Text>
          <Text style={styles.createdAt}>
            Created at:{" "}
            {auth.currentUser.metadata.creationTime.substring(5, 22)}
          </Text>
          <Text style={styles.createdAt}>
            Last Sign In:{" "}
            {auth.currentUser.metadata.lastSignInTime.substring(5, 22)}
          </Text>
        </View>
      </View>
      {/* options... information... */}
      <Text style={styles.signout} onPress={() => auth.signOut()}>
        Sign out
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  profileHeader: {
    flexDirection: "row",
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 60,
    borderColor: theme.colors.hazeText,
    borderWidth: 0.8,
    color: theme.colors.hazeText,
    fontSize: theme.dimensions.standardFontSize + 14,
    justifyContent: "center",
    textAlign: "center",
  },
  displayName: {
    fontSize: theme.dimensions.standardFontSize + 5,
    color: theme.colors.text,
  },
  profileInfo: {
    flexDirection: "column",
    margin: 18,
  },
  createdAt: {
    color: theme.colors.hazeText,
    fontSize: theme.dimensions.standardFontSize - 4,
  },
  signout: {
    fontSize: theme.dimensions.standardFontSize,
    color: theme.colors.text,
    width: "100%",
    borderBottomWidth: 0.5,
    borderBottomColor: theme.colors.hazeText,
    padding: 7,
  },
});
