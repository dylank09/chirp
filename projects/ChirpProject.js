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

const firestore = firebase.firestore(app);

export default function ChirpProject({ name, onBackPress, projectId }) {
  const projectRef = firestore.collection("projects").doc(projectId);
  const [project, loading] = useDocumentData(projectRef);

  //   const todosRef = projectRef.collection("messages");
  //   const query = todosRef.orderBy("createdAt").limit(50);
  //   const [todos, loading] = useCollectionData(query, { idField: "todoId" });

  //   async function sendText(text) {
  //     await messagesRef.add({
  //       text: text ? text : "",
  //       createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  //       uid,
  //       user: user.name,
  //     });

  //     firestore
  //       .collection("chatGroups")
  //       .doc(id)
  //       .update({
  //         membersUnseen: chat.members,
  //         lastMessage: text.length < 30 ? text : text.slice(0, 30) + "...",
  //         lastMessageTimestamp: firebase.firestore.FieldValue.serverTimestamp(),
  //       });
  //   }

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
          <MemberList style={styles.memberSection} members={project.members} />
          <TodoList style={styles.todoSection} projectId={projectId} />
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
    flexDirection: "column",
    width: "100%",
    height: "100%",
    backgroundColor: theme.colors.background,
    alignItems: "center",
    justifyContent: "space-between",
  },
  header: {
    flexDirection: "row",
    width: "90%",
    justifyContent: "space-between",
    marginTop: 15,
    marginBottom: 30,
  },
  back: {
    alignSelf: "flex-start",
  },
  chatName: {
    color: theme.colors.text,
    textAlign: "center",
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: theme.dimensions.standardFontSize + 2,
  },
  project: {
    height: "90%",
    width: "100%",
  },
  memberSection: {
    // flex: 2,
  },
  todoSection: {
    // flex: 3,
  },
  deadlineSection: {
    // flex: 1,
  },
});
