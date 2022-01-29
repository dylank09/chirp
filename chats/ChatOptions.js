import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import { theme } from "../assets/Theme";

import ChirpButton from "../components/ChirpButton";
import FormatTime from "../functions/FormatTime";
import MemberList from "../components/MemberList";
import AddMember from "../components/AddMember";

import firestore from "../config/FirestoreInit";
import auth from "../config/FirebaseAuthInit";

export default function ChatOptions({
  name,
  id,
  returnToChat,
  chatData,
  returnToMain,
}) {
  const chatRef = firestore.collection("chatGroups").doc(id);

  function deleteChat() {
    chatRef.delete();
    returnToMain();
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <AntDesign name="left" size={24} color="white" onPress={returnToChat} />
        <Text style={styles.chatName}>{name}</Text>
        {auth.currentUser.email === chatData.admin ? (
          <AntDesign
            name="delete"
            size={24}
            color={theme.colors.text}
            onPress={deleteChat}
          />
        ) : (
          <AntDesign name="back" size={24} color={theme.colors.background} />
        )}
      </View>
      <Text style={styles.chatInfo}>
        {" "}
        {chatData.createdAt
          ? "Created on: " + FormatTime(chatData.createdAt.seconds)
          : ""}
      </Text>
      <AddMember
        currentMembers={chatData.members}
        chatId={id}
        fsRef={chatRef}
      />
      <MemberList
        members={chatData.members}
        fsRef={chatRef}
        admin={chatData.admin}
      />
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
    marginTop: 20,
    marginBottom: 20,
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
