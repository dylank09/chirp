import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Alert,
  Platform,
  BackHandler,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

import { theme } from "../assets/Theme";

import Header from "../components/Header";
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

  BackHandler.addEventListener("hardwareBackPress", function () {
    returnToChat();
    return true;
  });

  function deleteChat() {
    if (Platform.OS === "web") {
      chatRef.delete();
      returnToMain();
    } else {
      Alert.alert(
        "Confirm Delete",
        "Are you sure you want to delete this chat and all data associated with it?",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Delete",
            style: "destructive",
            onPress: () => {
              chatRef.delete();
              returnToMain();
            },
          },
        ]
      );
    }
  }

  return (
    <ScrollView style={styles.container}>
      {auth.currentUser.email === chatData.admin ? (
        <View style={styles.header}>
          <AntDesign
            name="left"
            size={24}
            color="white"
            onPress={returnToChat}
          />
          <Text style={styles.chatName}>{name}</Text>
          <AntDesign
            name="delete"
            size={24}
            color={theme.colors.text}
            onPress={deleteChat}
          />
        </View>
      ) : (
        <Header name={name} onPress={returnToChat} />
      )}
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
