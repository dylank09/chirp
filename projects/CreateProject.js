import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import { theme } from "../assets/Theme";
import ChirpButton from "../components/ChirpButton";
import ChirpTextBox from "../components/ChirpTextBox";

import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firestore = firebase.firestore();
const auth = firebase.auth();

export default function CreateProject({ onBackPress }) {
  const [name, setName] = useState("");

  function createProject() {
    const projectsRef = firestore.collection("projects");
    projectsRef.doc().set({
      name: name,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      deadline: firebase.firestore.FieldValue.serverTimestamp() + 20000,
      members: [auth.currentUser.uid],
      todos: [],
    });

    onBackPress();
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <AntDesign
          style={styles.back}
          name="left"
          size={24}
          color="white"
          onPress={onBackPress}
        />
        <Text style={styles.chatName}>Create new project</Text>
      </View>
      <ChirpButton
        onPress={createProject}
        width="70%"
        text="Create Project"
      ></ChirpButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    width: "100%",
    height: "100%",
    backgroundColor: theme.colors.background,
    alignItems: "center",
    justifyContent: "space-between",
  },
  header: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    marginVertical: 15,
  },
  back: {
    marginLeft: 10,
  },
  chatName: {
    color: theme.colors.text,
    width: "100%",
    textAlign: "center",
    marginRight: 25,
    fontWeight: "bold",
    fontSize: theme.dimensions.standardFontSize + 2,
  },
});
