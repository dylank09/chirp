import React from "react";
import { StyleSheet, ScrollView, Text, View } from "react-native";
import { AntDesign, Entypo, MaterialIcons } from "@expo/vector-icons";

import { theme } from "../assets/Theme";

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
  const [todos, loading] = useCollectionData(query, { idField: "todoId" });

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Todo List</Text>
      {todos &&
        todos.map((todo, i) => (
          <View key={i} style={styles.todo}>
            <Text style={styles.description}>{todo.description}</Text>
            <Text style={styles.author}>by: {todo.author}</Text>
            <Text style={styles.author}>Assigned To: {todo.assignee}</Text>
            <Text style={styles.author}>Size: {todo.size}</Text>
            {todo.done ? (
              <MaterialIcons name="done-outline" size={20} color="white" />
            ) : (
              <Entypo name="circle-with-cross" size={20} color="white" />
            )}
            <AntDesign name="delete" size={20} color="white" />
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
    flexDirection: "row",
    justifyContent: "space-around",
  },
  description: {
    color: theme.colors.text,
    fontSize: theme.dimensions.standardFontSize,
  },
  author: {
    color: theme.colors.text,
    fontSize: theme.dimensions.standardFontSize,
  },
});
