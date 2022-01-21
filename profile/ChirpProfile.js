import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

import { theme } from "../assets/Theme";
import app from "../config/FirebaseConfig";
import ChirpSwitch from "../components/ChirpSwitch";

const firestore = firebase.firestore(app);
const auth = firebase.auth();

export default function Profile() {
  const [lightMode, setLightMode] = useState(false);

  const usersRef = firestore.collection("users");
  const query = usersRef.where("email", "==", auth.currentUser.email);
  const [user] = useCollectionData(query, { idField: "userid" });

  const { photoURL, displayName } = auth.currentUser;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileHeader}>
        {photoURL ? (
          <Image style={styles.profileImage} source={{ uri: photoURL }}></Image>
        ) : (
          <View style={styles.profileImage}>
            <Text style={styles.profileText}>
              {user ? user[0].name.slice(0, 1) : ""}
            </Text>
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
      <View style={styles.options}>
        <ChirpSwitch
          text="Enable light mode"
          value={lightMode}
          func={setLightMode}
        />
        <Text style={styles.signout} onPress={() => auth.signOut()}>
          Sign out
        </Text>
      </View>
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
    justifyContent: "center",
  },
  profileText: {
    color: theme.colors.hazeText,
    fontSize: theme.dimensions.standardFontSize + 14,
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
  options: {
    marginTop: 20,
  },
  signout: {
    fontSize: theme.dimensions.standardFontSize + 2,
    color: theme.colors.text,
    width: "100%",
    padding: 7,
  },
});
