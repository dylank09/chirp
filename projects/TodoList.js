import React, { useState } from "react";
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  Alert,
  Platform,
} from "react-native";
import { AntDesign, Entypo, MaterialIcons } from "@expo/vector-icons";

import { theme } from "../assets/Theme";
import CreateButton from "../components/CreateButton";
import AddTodo from "./AddTodo";

export default function TodoList({ todos, todosRef, userRef }) {
  const [createTodo, setCreateTodo] = useState(false);

  // delete todo function with logic for which platform we are using
  function deleteTodo(todoId) {
    if (Platform.OS === "web") {
      todosRef.doc(todoId).delete();
    } else {
      Alert.alert(
        "Confirm Delete",
        "Are you sure you want to delete this todo and all data associated with it?",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Delete",
            style: "destructive",
            onPress: () => {
              todosRef.doc(todoId).delete();
            },
          },
        ]
      );
    }
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
        userRef={userRef}
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
      {todos && todos.length > 0 ? (
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
                {todo.assignee ? "Assignee: " + todo.assignee : ""}
              </Text>
              <Text style={styles.info}>
                {todo.size ? "Size: " + todo.size : ""}
              </Text>
              <Text style={styles.info}>
                {todo.author ? "Creator: " + todo.author : ""}
              </Text>

              <AntDesign
                name="delete"
                size={20}
                color={theme.colors.hazeText}
                onPress={() => deleteTodo(todo.todoId)}
              />
            </View>
          </View>
        ))
      ) : (
        <Text style={styles.noMessagesText}>
          {"\n\n\n\n"} Click on the ✏️ to start making your first todo!
        </Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
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
    minWidth: "20%",
  },
  noMessagesText: {
    textAlign: "center",
    width: "70%",
    alignSelf: "center",
    color: theme.colors.hazeText,
    fontSize: theme.dimensions.standardFontSize + 2,
  },
});
