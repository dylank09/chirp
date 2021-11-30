import React, { useState } from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";

import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

import { theme } from "../assets/Theme";
import ChirpPreview from "./ChirpPreview";
import SearchBar from "../components/SearchBar";
import ChirpChat from "./ChirpChat";

const firestore = firebase.firestore();

export default function ChirpGroups() {
  const [clicked, setClicked] = useState(true);
  const [chatId, setChatId] = useState();
  const [groups, setGroups] = useState();

  const auth = firebase.auth();

  function goToChat(id) {
    setChatId(id);
    setClicked(true);
  }

  function getJoinedChatGroups() {
    const userRef = firestore.collection("users").doc(auth.currentUser.uid);

    const data = userRef.get();

    console.log(data);
    //setGroups(data)
  }

  function backToGroups() {
    setClicked(false);
    setChatId(0);
  }

  return (
    <View style={styles.outerContainer}>
      {clicked ? (
        <ChirpChat id={chatId} onBackPress={backToGroups} />
      ) : (
        <SafeAreaView style={styles.container}>
          <SearchBar></SearchBar>
          <ChirpPreview onPress={() => goToChat(1)}></ChirpPreview>
        </SafeAreaView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    alignItems: "center",
  },
  outerContainer: {
    height: "100%",
    width: "100%",
  },
});
