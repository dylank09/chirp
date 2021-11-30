import React, { useState } from "react";
import { StyleSheet, Image, Text, View, SafeAreaView } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import { theme } from "../assets/Theme";
import Message from "./Message";
import SendText from "./SendText";

import firebase from "../config/FirebaseConfig";
import "firebase/firestore";

const firestore = firebase.firestore();

export default function ChirpChat({ id, onBackPress }) {
  const [msgs, setMsgs] = useState();

  function chatRoom() {
    const messagesRef = firestore
      .collection("chatGroups")
      .doc(id)
      .collection("messages");

    const query = messagesRef.orderBy("createdAt").limit(25);

    const [messages] = useCollectionData(query, { idField: "id" });

    setMsgs(messages);
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
        <Text style={styles.chatName}>Name of Chat, ID: {id} </Text>
      </View>
      <View style={styles.messagesBox}>
        <Message></Message>
      </View>
      <View style={styles.bottomBar}>
        <SendText></SendText>
      </View>
    </View>
  );
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
  messagesBox: {
    flex: 1,
    width: "100%",
  },
  bottomBar: {
    width: "100%",
    justifyContent: "center",
  },
  back: {
    marginLeft: 10,
  },
  chatName: {
    color: theme.colors.text,
    width: "100%",
    textAlign: "center",
    marginRight: 25,
  },
});
