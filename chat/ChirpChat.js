import React from "react";
import { StyleSheet, Image, Text, View, SafeAreaView } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import { theme } from "../assets/Theme";
import Message from "./Message";
import SendText from "./SendText";

import firebase from "../config/FirebaseConfig";
import "firebase/firestore";

const firestore = firebase.firestore();

export default function ChirpChat({ id, onBackPress }) {
  function chatRoom() {
    const messagesRef = firestore
      .collection("chatGroups")
      .doc(id)
      .collection("messages");

    const query = messagesRef.orderBy("createdAt").limit(25);

    const [messages] = useCollectionData(query, { idField: "id" });
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <AntDesign
          style={styles.back}
          name="left"
          size={24}
          color="black"
          onPress={onBackPress}
        />
        <Text style={styles.chatName}>Name of Chat, ID: {id} </Text>
      </View>
      <View>
        <Message></Message>
      </View>
      <SendText></SendText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: theme.colors.background,
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    marginTop: 15,
  },
  back: {
    marginLeft: 10,
  },
  chatName: {
    alignSelf: "flex-start",
    width: "100%",
    textAlign: "center",
    marginRight: 25,
  },
});
