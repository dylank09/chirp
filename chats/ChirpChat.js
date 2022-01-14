import React, { useState, useRef } from "react";
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  KeyboardAvoidingView,
} from "react-native";
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons";

import { theme } from "../assets/Theme";
import Message from "./Message";
import SendText from "./SendText";
import LoadingScreen from "../components/LoadingScreen";
import ChatOptions from "./ChatOptions";

import firebase from "firebase/app";
import "firebase/firestore";
import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import app from "../config/FirebaseConfig";

const firestore = firebase.firestore(app);
const auth = firebase.auth();

export default function ChirpChat({ name, id, onBackPress }) {
  const [optionsOpen, setOptionsOpen] = useState(false);

  const scrollViewRef = useRef();

  const { uid } = auth.currentUser;
  const userRef = firestore.collection("users").doc(uid);
  const [user] = useDocumentData(userRef);

  const chatRef = firestore.collection("chatGroups").doc(id);
  const [chat] = useDocumentData(chatRef);

  const messagesRef = chatRef.collection("messages");
  const query = messagesRef.orderBy("createdAt").limit(50);
  const [msgs, loading] = useCollectionData(query, { idField: "msgId" });

  async function sendText(text) {
    await messagesRef.add({
      text: text ? text : "",
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      user: user.name,
    });

    firestore
      .collection("chatGroups")
      .doc(id)
      .update({
        membersUnseen: chat.members,
        lastMessage: text.length < 30 ? text : text.slice(0, 30) + "...",
        lastMessageTimestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
  }

  function openOptions() {
    setOptionsOpen(true);
  }

  if (loading) {
    return <LoadingScreen />;
  } else if (optionsOpen) {
    return (
      <ChatOptions
        name={name}
        id={id}
        chatData={chat}
        returnToChat={() => setOptionsOpen(false)}
        returnToMain={onBackPress}
      ></ChatOptions>
    );
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <AntDesign
            name="left"
            size={24}
            color="white"
            onPress={onBackPress}
          />
          <Text style={styles.chatName}>{name}</Text>
          <SimpleLineIcons
            name="options-vertical"
            size={22}
            color="white"
            onPress={openOptions}
          />
        </View>
        <ScrollView
          style={styles.messagesBox}
          ref={scrollViewRef}
          onContentSizeChange={() =>
            scrollViewRef.current.scrollToEnd({ animated: false })
          }
        >
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
        <KeyboardAvoidingView
          style={styles.bottomBar}
          behavior="padding"
          keyboardVerticalOffset={-150}
        >
          <SendText send={sendText}></SendText>
        </KeyboardAvoidingView>
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
    width: "90%",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  messagesBox: {
    flex: 1,
    width: "100%",
  },
  bottomBar: {
    width: "100%",
    justifyContent: "center",
  },
  chatName: {
    color: theme.colors.text,
    textAlign: "center",
    fontWeight: "500",
    fontSize: theme.dimensions.standardFontSize + 2,
  },
});