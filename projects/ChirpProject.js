import React, { useState } from "react";
import { StyleSheet, ScrollView, Text, View } from "react-native";
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons";

import { theme } from "../assets/Theme";
import LoadingScreen from "../components/LoadingScreen";
import firebase from "firebase/app";
import "firebase/firestore";
import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import app from "../config/FirebaseConfig";

const firestore = firebase.firestore(app);
const auth = firebase.auth();

export default function ChirpProject({ name, id, onBackPress }) {
  const { uid } = auth.currentUser;
  const userRef = firestore.collection("users").doc(uid);
  const [user] = useDocumentData(userRef);

  const projectRef = firestore.collection("projects").doc(id);
  const [project] = useDocumentData(projectRef);

  const loading = false;

  //   const todosRef = projectRef.collection("messages");
  //   const query = todosRef.orderBy("createdAt").limit(50);
  //   const [todos, loading] = useCollectionData(query, { idField: "todoId" });

  //   async function sendText(text) {
  //     await messagesRef.add({
  //       text: text ? text : "",
  //       createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  //       uid,
  //       user: user.name,
  //     });

  //     firestore
  //       .collection("chatGroups")
  //       .doc(id)
  //       .update({
  //         membersUnseen: chat.members,
  //         lastMessage: text.length < 30 ? text : text.slice(0, 30) + "...",
  //         lastMessageTimestamp: firebase.firestore.FieldValue.serverTimestamp(),
  //       });
  //   }

  if (loading) {
    return <LoadingScreen />;
  } else {
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
          <Text style={styles.chatName}>{name}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  bottomBar: {
    width: "100%",
    justifyContent: "center",
  },
  back: {
    marginLeft: 10,
  },
  options: {
    alignSelf: "flex-end",
    marginRight: 10,
  },
  chatName: {
    color: theme.colors.text,
    width: "100%",
    textAlign: "center",
    marginRight: 25,
    fontWeight: "500",
    fontSize: theme.dimensions.standardFontSize + 2,
  },
});
