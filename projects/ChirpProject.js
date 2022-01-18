import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import { theme } from "../assets/Theme";
import LoadingScreen from "../components/LoadingScreen";
import MemberList from "../components/MemberList";

import firebase from "firebase/app";
import "firebase/firestore";
import { useDocumentData } from "react-firebase-hooks/firestore";
import app from "../config/FirebaseConfig";
import Deadline from "./Deadline";
import TodoList from "./TodoList";
import AddMember from "../components/AddMember";

const firestore = firebase.firestore(app);

export default function ChirpProject({ name, onBackPress, projectId }) {
  const projectRef = firestore.collection("projects").doc(projectId);
  const [project, loading] = useDocumentData(projectRef);

  if (loading) {
    return <LoadingScreen />;
  } else {
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
          <Text style={styles.chatName}>{name}</Text>
          <AntDesign name="left" size={24} color={theme.colors.background} />
        </View>
        <View style={styles.project}>
          <MemberList members={project.members} />
          <AddMember currentMembers={project.members} projectId={projectId} />
          <TodoList projectId={projectId} />
          <Deadline
            currentDeadline={project.deadline.seconds}
            projectId={projectId}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    alignItems: "center",
    justifyContent: "space-around",
  },
  header: {
    flexDirection: "row",
    width: "90%",
    justifyContent: "space-between",
    marginTop: 15,
    marginBottom: 15,
  },
  back: {
    alignSelf: "flex-start",
  },
  chatName: {
    color: theme.colors.text,
    textAlign: "center",
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: theme.dimensions.standardFontSize + 3,
  },
  project: {
    height: "90%",
    width: "100%",
  },
});
