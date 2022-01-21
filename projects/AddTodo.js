import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";

import { theme } from "../assets/Theme";
import ChirpButton from "../components/ChirpButton";
import ChirpTextBox from "../components/ChirpTextBox";
import TextAlert from "../components/TextAlert";

import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firestore = firebase.firestore();
const auth = firebase.auth();

export default function AddTodo({ todosRef, onBackPress, onSubmit }) {
  const [description, setDescription] = useState("");
  const [assignee, setAssignee] = useState("");
  const [size, setSize] = useState();
  const [descriptionError, setDescriptionError] = useState("");

  async function addTodo() {
    var author = auth.currentUser.displayName;
    author = author.substring(0, author.indexOf(" "));
    console.log(author);

    if (description.length < 2) {
      setDescriptionError("Description is too short");
    } else if (description.length > 120) {
      setDescriptionError("Description is too long");
    } else {
      await todosRef.add({
        description: description,
        assignee: assignee,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        author: author,
        done: false,
        size: size,
      });
      onSubmit();
    }
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
        <Text style={styles.todoName}>Create new todo</Text>
      </View>
      <View style={styles.todoInfo}>
        <ChirpTextBox
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
          allowMultiline={true}
        ></ChirpTextBox>
        <TextAlert text={descriptionError} />
        <ChirpTextBox
          placeholder="Assignee"
          value={assignee}
          onChangeText={setAssignee}
        ></ChirpTextBox>
        <Picker
          selectedValue={size}
          onValueChange={(itemValue, itemIndex) => setSize(itemValue)}
          prompt="Select size"
        >
          <Picker.Item label="S" value="S" />
          <Picker.Item label="M" value="M" />
          <Picker.Item label="L" value="L" />
        </Picker>
      </View>
      <ChirpButton onPress={addTodo} width="70%" text="Add Todo"></ChirpButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1,
    width: "100%",
    marginBottom: 15,
    marginTop: 20,
    borderBottomColor: theme.colors.jet,
    borderBottomWidth: 1,
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
  todoName: {
    color: theme.colors.text,
    width: "100%",
    textAlign: "center",
    marginRight: 25,
    fontWeight: "bold",
    fontSize: theme.dimensions.standardFontSize,
  },
  todoInfo: {
    height: "60%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
