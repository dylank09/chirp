import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";

import { theme } from "../assets/Theme";
import ChirpButton from "../components/ChirpButton";
import ChirpTextBox from "../components/ChirpTextBox";
import TextAlert from "../components/TextAlert";

import firebase from "../config/FirebaseInit";

export default function AddTodo({ todosRef, onBackPress, onSubmit }) {
  const [description, setDescription] = useState("");
  const [assignee, setAssignee] = useState("");
  const [creator, setCreator] = useState("");
  const [size, setSize] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  async function addTodo() {
    if (description.length < 2) {
      setDescriptionError("Description is too short");
    } else if (description.length > 120) {
      setDescriptionError("Description is too long");
    } else {
      await todosRef.add({
        description: description,
        assignee: assignee,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        author: creator,
        done: false,
        size: size,
      });
      onSubmit();
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <AntDesign name="left" size={24} color="white" onPress={onBackPress} />
        <Text style={styles.todoName}>Create todo</Text>
        <AntDesign name="left" size={24} color={theme.colors.background} />
      </View>
      <View style={styles.todoInfo}>
        <ChirpTextBox
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
          allowMultiline={true}
          smallVersion={true}
        ></ChirpTextBox>
        <TextAlert text={descriptionError} />
        <ChirpTextBox
          placeholder="Assignee"
          value={assignee}
          smallVersion={true}
          onChangeText={setAssignee}
        ></ChirpTextBox>
        <ChirpTextBox
          placeholder="Creator"
          value={creator}
          onChangeText={setCreator}
          smallVersion={true}
        ></ChirpTextBox>
        <View style={styles.pickerRow}>
          <Text style={styles.pickerHelpText}>Todo size: </Text>
          <View style={{ flex: 1, padding: 0, margin: 0 }}>
            <Picker
              style={{
                color: theme.colors.text,
                fontSize: theme.dimensions.standardFontSize,
                maxHeight: 80,
              }}
              itemStyle={{
                height: 36,
                color: theme.colors.text,
                fontSize: theme.dimensions.standardFontSize,
              }}
              selectedValue={size}
              onValueChange={(itemValue, itemIndex) => setSize(itemValue)}
              prompt="Todo size"
            >
              <Picker.Item label="Select size" value="" />
              <Picker.Item label="S" value="S" />
              <Picker.Item label="M" value="M" />
              <Picker.Item label="L" value="L" />
            </Picker>
          </View>
        </View>
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
    marginBottom: 2,
    marginTop: 0,
    borderBottomColor: theme.colors.jet,
    borderBottomWidth: 1,
    alignItems: "center",
    justifyContent: "space-between",
  },
  header: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  todoName: {
    color: theme.colors.text,
    fontWeight: "bold",
    fontSize: theme.dimensions.standardFontSize,
  },
  todoInfo: {
    // height: "50%",
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  pickerRow: {
    flexDirection: "row",
    alignSelf: "center",
    width: "75%",
    justifyContent: "space-around",
    marginTop: 5,
  },
  pickerHelpText: {
    color: theme.colors.text,
    fontSize: theme.dimensions.standardFontSize,
  },
});
