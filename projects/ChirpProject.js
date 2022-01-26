import React, { useState } from "react";
import { StyleSheet, Text, View, Modal } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import { theme } from "../assets/Theme";
import LoadingScreen from "../components/LoadingScreen";
import MemberList from "../components/MemberList";
import Deadline from "./Deadline";
import TodoList from "./TodoList";
import AddMember from "../components/AddMember";
import ChirpButton from "../components/ChirpButton";

import {
  useDocumentData,
  useCollectionData,
} from "react-firebase-hooks/firestore";

import firestore from "../config/FirestoreInit";
import auth from "../config/FirebaseAuthInit";

export default function ChirpProject({ name, onBackPress, projectId }) {
  const [modalVisible, setModalVisible] = useState(false);

  const projectRef = firestore.collection("projects").doc(projectId);
  const [project, loading] = useDocumentData(projectRef);

  function deleteProject() {
    projectRef.delete();
    onBackPress();
  }

  const todosRef = projectRef.collection("todos");
  const query = todosRef.orderBy("done", "asc").limit(50);
  const [todos] = useCollectionData(query, { idField: "todoId" });

  if (todos) {
    todos.sort(function (a, b) {
      if (a.done) return 1;
      return b.createdAt - a.createdAt;
    });

    if (todos[0] && project.nextTodo !== todos[0].description) {
      projectRef.update({
        nextTodo: todos[0].description,
      });
    }
  }

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
          {auth.currentUser.email === project.admin ? (
            <AntDesign
              name="delete"
              size={24}
              color={theme.colors.text}
              onPress={deleteProject}
            />
          ) : (
            <AntDesign name="back" size={24} color={theme.colors.background} />
          )}
        </View>
        <View style={styles.project}>
          <Text style={styles.description}>
            {project.description ? project.description : ""}
          </Text>
          <ChirpButton
            text="Show Members"
            onPress={() => setModalVisible(true)}
            width="50%"
          ></ChirpButton>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(!modalVisible)}
          >
            <View style={styles.modalView}>
              <MemberList
                members={project.members}
                fsRef={projectRef}
                admin={project.admin}
              />
              <AddMember
                currentMembers={project.members}
                projectId={projectId}
                fsRef={projectRef}
              />
              <ChirpButton
                text="Close"
                width="60%"
                onPress={() => setModalVisible(!modalVisible)}
              ></ChirpButton>
            </View>
          </Modal>
          <TodoList todos={todos} todosRef={todosRef} />
          <Deadline projectId={projectId} />
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
    marginBottom: 5,
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
    alignItems: "center",
  },
  description: {
    color: theme.colors.hazeText,
    textAlign: "center",
    width: "90%",
    marginBottom: 5,
  },
  modalView: {
    height: "60%",
    backgroundColor: theme.colors.background,
    margin: 20,
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
