import React, { useState } from "react";
import { StyleSheet, ScrollView, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import { theme } from "../assets/Theme";
import Message from "./Message";
import SendText from "./SendText";
import LoadingScreen from "../components/LoadingScreen";

import firebase from "firebase/app";
import "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import app from "../config/FirebaseConfig";

const firestore = firebase.firestore(app);
const auth = firebase.auth();

export default function ChirpChat({ name, id, onBackPress }) {
  const messagesRef = firestore
    .collection("chatGroups")
    .doc(id)
    .collection("messages");
  const query = messagesRef.orderBy("createdAt").limit(50);
  const [msgs, loading] = useCollectionData(query, { idField: "msgId" });

  const { uid, displayName } = auth.currentUser;
  const [user, setUser] = useState();
  firestore
    .collection("users")
    .doc(uid)
    .get()
    .then((snapshot) => setUser(snapshot.data()));

  async function sendText(text) {
    await messagesRef.add({
      text: text ? text : "",
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      user: user.name,
    });
  }

  if (loading) {
    return <LoadingScreen />;
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
        <Text style={styles.chatName}>{name}</Text>
      </View>
      <ScrollView style={styles.messagesBox}>
        {msgs &&
          msgs.map((msg) => (
            <Message
              key={msg.msgId}
              text={msg.text}
              timestamp={msg.createdAt ? msg.createdAt.seconds : "  "}
              me={msg.uid == uid}
              user={msg.user}
            />
          ))}
      </ScrollView>
      <View style={styles.bottomBar}>
        <SendText send={sendText}></SendText>
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
    fontWeight: "500",
  },
});
