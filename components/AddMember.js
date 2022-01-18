import React, { useState } from "react";
import { StyleSheet, ScrollView, Text, View, TextInput } from "react-native";

import { theme } from "../assets/Theme";
import TextAlert from "../components/TextAlert";
import ChirpButton from "./ChirpButton";

import firebase from "firebase/app";
import "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import app from "../config/FirebaseConfig";

const firestore = firebase.firestore(app);

export default function AddMember({ currentMembers, chatId, projectId }) {
  const [email, setEmail] = useState("");
  const [addMemberAlert, setAddMemberAlert] = useState("");

  const fsRef = chatId
    ? firestore.collection("chatGroups").doc(chatId)
    : firestore.collection("projects").doc(projectId);
  const usersRef = firestore.collection("users");
  const query = usersRef.where("email", "==", email);
  const [user] = useCollectionData(query, { idField: "userid" });

  function addMember() {
    setAddMemberAlert("");

    if (!user[0]) {
      setAddMemberAlert("No user with that email exists");
      return;
    }

    let userEmail = user[0].email;
    if (!currentMembers.includes(userEmail)) {
      let newMembers = currentMembers;
      newMembers.push(userEmail);
      fsRef.update({
        members: newMembers,
      });
      setEmail("");
      setAddMemberAlert("Successful");
    } else {
      setAddMemberAlert("User is already in the chat");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.optionsText}>Add member</Text>
      <View style={styles.addMember}>
        <TextInput
          style={styles.memberTextBox}
          placeholder="Email"
          placeholderTextColor={theme.colors.placeholderColor}
          value={email}
          onChangeText={setEmail}
        ></TextInput>
        <ChirpButton
          text="Add"
          onPress={() => addMember()}
          width="25%"
        ></ChirpButton>
      </View>
      <TextAlert text={addMemberAlert}></TextAlert>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 20,
    borderBottomColor: theme.colors.jet,
    borderBottomWidth: 1,
  },
  optionsText: {
    color: theme.colors.text,
    fontSize: theme.dimensions.standardFontSize,
    fontWeight: "bold",
    alignSelf: "center",
    marginTop: 4,
  },
  addMember: {
    borderRadius: 18,
    borderColor: theme.colors.primary,
    borderWidth: 1,
    flexDirection: "row",
    margin: 7,
    width: "90%",
    justifyContent: "space-around",
    alignSelf: "center",
  },
  memberTextBox: {
    width: "60%",
    color: "white",
    fontSize: theme.dimensions.standardFontSize + 2,
    margin: 7,
  },
});
