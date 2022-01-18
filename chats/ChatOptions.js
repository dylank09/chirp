import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, ScrollView } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import { theme } from "../assets/Theme";

import firebase from "firebase/app";
import "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";

import app from "../config/FirebaseConfig";
import ChirpButton from "../components/ChirpButton";
import FormatTime from "../functions/FormatTime";
import MemberList from "../components/MemberList";
import AddMember from "../components/AddMember";

const firestore = firebase.firestore(app);

export default function ChatOptions({
  name,
  id,
  returnToChat,
  chatData,
  returnToMain,
}) {
  const usersRef = firestore.collection("users");
  const chatRef = firestore.collection("chatGroups").doc(id);

  const [users] = useCollectionData(usersRef, { idField: "userid" });

  function deleteChat() {
    chatRef.delete();
    returnToMain();
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <AntDesign name="left" size={24} color="white" onPress={returnToChat} />
        <Text style={styles.chatName}>{name}</Text>
        <AntDesign name="left" size={24} color={theme.colors.background} />
      </View>
      <Text style={styles.chatInfo}>
        {" "}
        {chatData.createdAt
          ? "Created on: " + FormatTime(chatData.createdAt.seconds)
          : ""}
      </Text>
      <MemberList members={chatData.members} />
      <AddMember currentMembers={chatData.members} chatId={id} />
      <View style={styles.deleteButton}>
        <ChirpButton
          onPress={deleteChat}
          width="60%"
          text="Delete Chat"
        ></ChirpButton>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    width: "100%",
    height: "100%",
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: "row",
    width: "90%",
    justifyContent: "space-between",
    marginVertical: 20,
    alignSelf: "center",
  },
  chatName: {
    color: theme.colors.text,
    fontWeight: "bold",
    fontSize: theme.dimensions.standardFontSize + 2,
  },
  chatInfo: {
    color: theme.colors.hazeText,
    fontSize: theme.dimensions.standardFontSize - 2,
    alignSelf: "center",
    marginBottom: 30,
  },
  deleteButton: {
    marginTop: 30,
    width: "100%",
    alignItems: "center",
  },
});
