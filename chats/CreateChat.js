import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import { theme } from "../assets/Theme";
import ChirpButton from "../components/ChirpButton";
import ChirpTextBox from "../components/ChirpTextBox";

import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firestore = firebase.firestore();
const auth = firebase.auth();

export default function CreateChat({ onBackPress }) {
  const [name, setName] = useState("");

  function createChat() {
    const chatsRef = firestore.collection("chatGroups");
    chatsRef.doc().set({
      name: name,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      members: [auth.currentUser.email],
      membersUnseen: [],
      lastMessage: "",
      lastMessageTimestamp: null,
    });

    onBackPress();
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
        <Text style={styles.chatName}>Create new chat</Text>
      </View>
      <View style={styles.chatInfo}>
        <ChirpTextBox
          placeholder="Name"
          value={name}
          onChangeText={setName}
        ></ChirpTextBox>
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
