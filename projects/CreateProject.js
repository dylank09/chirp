import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import { theme } from "../assets/Theme";
import ChirpButton from "../components/ChirpButton";
import ChirpTextBox from "../components/ChirpTextBox";

import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import Deadline from "./Deadline";

const firestore = firebase.firestore();
const auth = firebase.auth();

export default function CreateProject({ onBackPress }) {
  const [name, setName] = useState("");
  const [projectId, setProjectId] = useState();
  const projectsRef = firestore.collection("projects");

  async function createProject() {
    const { id } = await projectsRef.add({
      name: name,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      deadline: firebase.firestore.FieldValue.serverTimestamp(),
      members: [auth.currentUser.email],
      admin: auth.currentUser.email,
      nextTodo: "",
    });
    setProjectId(id);
  }

  if (projectId) {
    return (
      <View style={styles.deadlineContainer}>
        <Deadline projectId={projectId} />
        <ChirpButton
          onPress={onBackPress}
          width="70%"
          text="Set Deadline"
        ></ChirpButton>
      </View>
    );
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
        <Text style={styles.projectName}>Create new project</Text>
      </View>
      <View style={styles.projectInfo}>
        <ChirpTextBox
          placeholder="Name"
          value={name}
          onChangeText={setName}
        ></ChirpTextBox>
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
  deadlineContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
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
  projectName: {
    color: theme.colors.text,
    width: "100%",
    textAlign: "center",
    marginRight: 25,
    fontWeight: "bold",
    fontSize: theme.dimensions.standardFontSize + 2,
  },
  projectInfo: {
    height: "60%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
