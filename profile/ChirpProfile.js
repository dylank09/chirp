import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView, Image } from "react-native";

import { theme } from "../assets/Theme";
import ChirpSwitch from "../components/ChirpSwitch";

import { useCollectionData } from "react-firebase-hooks/firestore";

import firestore from "../config/FirestoreInit";
import auth from "../config/FirebaseAuthInit";

export default function Profile() {
  const [lightMode, setLightMode] = useState(false);

  const usersRef = firestore.collection("users");
  const query = usersRef.where("email", "==", auth.currentUser.email);
  const [user] = useCollectionData(query, { idField: "userid" });

  const { photoURL, displayName } = auth.currentUser;

  if (user) {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.profileHeader}>
          {photoURL ? (
            <Image
              style={styles.profileImage}
              source={{ uri: photoURL }}
            ></Image>
          ) : (
            <View style={styles.profileImage}>
              <Text style={styles.profileText}>{user[0].name.slice(0, 1)}</Text>
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
        <View style={styles.options}>
          <Text style={styles.option} onPress={() => console.log("clicked")}>
            Edit profile
          </Text>
          <Text style={styles.option} onPress={() => auth.signOut()}>
            Sign out
          </Text>
          <ChirpSwitch
            text="Enable light mode"
            value={lightMode}
            setValue={setLightMode}
          />
        </View>
      </ScrollView>
    );
  } else {
    return <View></View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  profileHeader: {
    flexDirection: "row",
    height: 100,
    marginTop: 10,
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
  option: {
    fontSize: theme.dimensions.standardFontSize + 2,
    color: theme.colors.text,
    width: "100%",
    padding: 7,
  },
});
