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

import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";

import firebase from "../config/FirebaseInit";
import firestore from "../config/FirestoreInit";
import auth from "../config/FirebaseAuthInit";

export default function ChirpChat({ name, id, onBackPress }) {
  const [optionsOpen, setOptionsOpen] = useState(false);
  const [text, setText] = useState("");

  const scrollViewRef = useRef();

  const currentUser = auth.currentUser;
  var uid, email;
  if (currentUser) {
    uid = currentUser.uid;
    email = currentUser.email;
  }
  const userRef = firestore.collection("users").doc(uid);
  const [user] = useDocumentData(userRef);

  const chatRef = firestore.collection("chatGroups").doc(id);
  const [chat] = useDocumentData(chatRef);

  const messagesRef = chatRef.collection("messages");
  const query = messagesRef.orderBy("createdAt").limit(50);
  const [msgs, loading] = useCollectionData(query, { idField: "msgId" });

  async function sendText() {
    if (text.length > 0) {
      await messagesRef.add({
        text: text ? text : "",
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid,
        email,
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

      setText("");
    }
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
            testID="backButton"
            onPress={onBackPress}
          />
          <Text style={styles.chatName} testID="chatName">
            {name}
          </Text>
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
            scrollViewRef.current.scrollToEnd({ animated: true })
          }
        >
          {msgs && msgs.length > 0 ? (
            msgs.map((msg) => (
              <Message
                key={msg.msgId}
                text={msg.text}
                timestamp={msg.createdAt ? msg.createdAt.seconds : "  "}
                me={msg.uid == uid}
                user={msg.user}
              />
            ))
          ) : (
            <Text style={styles.noMessagesText} testID="noChatsHelpText">
              Be the first to send a message! {"\n\n\n\n"} Click on the ⋮ in the
              top right corner to open options and add other members
            </Text>
          )}
        </ScrollView>
        <KeyboardAvoidingView
          style={styles.bottomBar}
          behavior="padding"
          keyboardVerticalOffset={-150}
        >
          <SendText
            text={text}
            setText={setText}
            send={sendText}
            testID="sendTextBox"
          ></SendText>
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
    marginTop: 20,
    marginBottom: 20,
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
    fontWeight: "bold",
    fontSize: theme.dimensions.standardFontSize + 2,
  },
  noMessagesText: {
    textAlign: "center",
    width: "80%",
    alignSelf: "center",
    color: theme.colors.hazeText,
    fontSize: theme.dimensions.standardFontSize + 2,
  },
});
