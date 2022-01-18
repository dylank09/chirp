import React from "react";
import { StyleSheet, ScrollView, Text, View } from "react-native";
import { AntDesign, Entypo, MaterialIcons } from "@expo/vector-icons";

import { theme } from "../assets/Theme";
import LoadingScreen from "../components/LoadingScreen";

import firebase from "firebase/app";
import "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import app from "../config/FirebaseConfig";

const firestore = firebase.firestore(app);

export default function TodoList({ projectId }) {
  const todosRef = firestore
    .collection("projects")
    .doc(projectId)
    .collection("todos");
  const query = todosRef.orderBy("createdAt").limit(50);
  const [todos] = useCollectionData(query, { idField: "todoId" });

  function deleteTodo(todoId) {
    todosRef.doc(todoId).delete();
  }

  function pressDone(todoId, newValue) {
    todosRef.doc(todoId).update({
      done: newValue,
    });
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Todo List</Text>
      {todos &&
        todos.map((todo, i) => (
          <View key={i} style={styles.todo}>
            <Text style={styles.description}>
              {todo.description ? todo.description : ""}
            </Text>
            <View style={styles.bottomSection}>
              <Text style={styles.info}>
                Creator: {todo.author ? todo.author : ""}
              </Text>
              <Text style={styles.info}>
                Assignee: {todo.assignee ? todo.assignee : ""}
              </Text>
              <Text style={styles.info}>
                Size: {todo.size ? todo.size : ""}
              </Text>
              {todo.done ? (
                <MaterialIcons
                  name="done-outline"
                  size={20}
                  color="white"
                  onPress={() => pressDone(todo.todoId, false)}
                />
              ) : (
                <Entypo
                  name="circle-with-cross"
                  size={20}
                  color="white"
                  onPress={() => pressDone(todo.todoId, true)}
                />
              )}
              <AntDesign
                name="delete"
                size={20}
                color="white"
                onPress={() => deleteTodo(todo.todoId)}
              />
            </View>
          </View>
        ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 20,
  },
  heading: {
    color: theme.colors.text,
    fontSize: theme.dimensions.standardFontSize,
    fontWeight: "bold",
    alignSelf: "center",
    marginTop: 4,
  },
  todo: {
    borderBottomColor: theme.colors.text,
    borderBottomWidth: 0.5,
    padding: 4,
    marginVertical: 5,
    flexDirection: "column",
    justifyContent: "space-around",
  },
  description: {
    color: theme.colors.text,
    fontSize: theme.dimensions.standardFontSize + 1,
    marginBottom: 2,
  },
  bottomSection: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  info: {
    color: theme.colors.hazeText,
    fontSize: theme.dimensions.standardFontSize - 1,
  },
});
