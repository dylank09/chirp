import React, { useState } from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";

import firebase from "../config/FirebaseConfig";
import "firebase/firestore";

import { theme } from "../assets/Theme";
import ChirpPreview from "./ChirpPreview";
import SearchBar from "../components/SearchBar";
import ChirpChat from "./ChirpChat";

const firestore = firebase.firestore();

export default function ChirpGroups() {
  const [clicked, setClicked] = useState(true);
  const [chatId, setChatId] = useState();
  const [groups, setGroups] = useState();

  function goToChat() {
    console.log("hiiii");
    setChatId(1);
    setClicked(true);
  }

  function getJoinedChatGroups() {
    const messagesRef = firestore
      .collection("chatGroups")
      .doc(id)
      .collection("messages");

    const query = messagesRef.orderBy("createdAt").limit(25);

    const [messages] = useCollectionData(query, { idField: "id" });
  }

  function backToGroups() {
    setClicked(false);
    setChatId(0);
  }

  return (
    <View>
      {clicked ? (
        <ChirpChat id={chatId} onBackPress={backToGroups} />
      ) : (
        <SafeAreaView style={styles.container}>
          <SearchBar></SearchBar>
          <ChirpPreview onPress={goToChat}></ChirpPreview>
        </SafeAreaView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    width: "100%",
    backgroundColor: theme.colors.background,
    alignItems: "center",
  },
});
