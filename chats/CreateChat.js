import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

import { theme } from "../assets/Theme";
import ChirpButton from "../components/ChirpButton";
import ChirpTextBox from "../components/ChirpTextBox";
import TextAlert from "../components/TextAlert";
import Header from "../components/Header";

import firestore from "../config/FirestoreInit";
import auth from "../config/FirebaseAuthInit";
import firebase from "../config/FirebaseInit";

export default function CreateChat({ onBackPress }) {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");

  function createChat() {
    if (name.length < 1) {
      setNameError("Name is too short");
    } else if (name.length > 25) {
      setNameError("Name is too long");
    } else {
      setNameError("");
      const chatsRef = firestore.collection("chatGroups");
      chatsRef.doc().set({
        name: name,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        members: [auth.currentUser.email],
        admin: auth.currentUser.email,
        membersUnseen: [],
        lastMessage: "",
        lastMessageTimestamp: null,
      });
      setName("");
      onBackPress();
    }
  }

  return (
    <View style={styles.container}>
      <Header name="Create Chat" onPress={onBackPress} />
      <View style={styles.chatInfo}>
        <ChirpTextBox
          placeholder="Name"
          value={name}
          onChangeText={setName}
        ></ChirpTextBox>
        <TextAlert text={nameError}></TextAlert>
      </View>
      <ChirpButton
        onPress={createChat}
        width="70%"
        text="Create Chat"
      ></ChirpButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    width: "100%",
    height: "100%",
    backgroundColor: theme.colors.background,
    alignItems: "center",
    justifyContent: "space-between",
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
  chatName: {
    color: theme.colors.text,
    width: "100%",
    textAlign: "center",
    marginRight: 25,
    fontWeight: "bold",
    fontSize: theme.dimensions.standardFontSize,
  },
  chatInfo: {
    height: "60%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
