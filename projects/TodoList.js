import React, { useState } from "react";
import { StyleSheet, ScrollView, Text, View } from "react-native";
import { AntDesign, Entypo, MaterialIcons } from "@expo/vector-icons";

import CreateButton from "../components/CreateButton";
import { theme } from "../assets/Theme";

import firebase from "firebase/app";
import "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import app from "../config/FirebaseConfig";
import AddTodo from "./AddTodo";

const firestore = firebase.firestore(app);

export default function TodoList({ projectId }) {
  const [createTodo, setCreateTodo] = useState(false);

  const todosRef = firestore
    .collection("projects")
    .doc(projectId)
    .collection("todos");
  const query = todosRef.orderBy("done", "asc").limit(50);
  const [todos] = useCollectionData(query, { idField: "todoId" });

  if (todos) {
    todos.sort(function (a, b) {
      return b.createdAt - a.createdAt;
    });
  }

  function deleteTodo(todoId) {
    todosRef.doc(todoId).delete();
  }

  function pressDone(todoId, newValue) {
    todosRef.doc(todoId).update({
      done: newValue,
    });
  }

  if (createTodo) {
    return (
      <AddTodo
        todosRef={todosRef}
        onBackPress={() => setCreateTodo(false)}
        onSubmit={() => setCreateTodo(false)}
      />
    );
  }
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.blankHeading} />
        <Text style={styles.heading}>Todo List</Text>
        <CreateButton onPress={setCreateTodo} size={40} />
      </View>
      {todos &&
        todos.map((todo, i) => (
          <View key={i} style={styles.todo}>
            <View style={styles.topSection}>
              <Text style={styles.description}>
                {todo.description ? todo.description : ""}
              </Text>
              {todo.done ? (
                <MaterialIcons
                  name="done-outline"
                  size={20}
                  color={theme.colors.hazeText}
                  onPress={() => pressDone(todo.todoId, false)}
                />
              ) : (
                <Entypo
                  name="circle-with-cross"
                  size={19}
                  color={theme.colors.hazeText}
                  onPress={() => pressDone(todo.todoId, true)}
                />
              )}
            </View>
            <View style={styles.bottomSection}>
              <Text style={styles.info}>
                Assignee: {todo.assignee ? todo.assignee : ""}
              </Text>
              <Text style={styles.info}>
                Size: {todo.size ? todo.size : ""}
              </Text>
              <Text style={styles.info}>
                Creator: {todo.author ? todo.author : ""}
              </Text>

              <AntDesign
                name="delete"
                size={20}
                color={theme.colors.hazeText}
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
    marginBottom: 15,
    marginTop: 20,
    borderBottomColor: theme.colors.jet,
    borderBottomWidth: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    alignContent: "center",
    alignSelf: "center",
  },
  blankHeading: {
    width: 50,
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
    maxWidth: "92%",
    color: theme.colors.text,
    fontSize: theme.dimensions.standardFontSize + 1,
  },
  topSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 3,
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
