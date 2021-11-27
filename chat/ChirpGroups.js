import React, { useState } from "react";
import { StyleSheet, Image, Text, View, SafeAreaView } from "react-native";

import { theme } from "../assets/Theme";

import firebase from "firebase/app";
import ChirpPreview from "./ChirpPreview";
import SearchBar from "../components/SearchBar";
import ChirpChat from "./ChirpChat";

export default function ChirpGroups() {
  const [clicked, setClicked] = useState(true);
  const [chatId, setChatId] = useState();

  function goToChat() {
    console.log("hiiii");
    setChatId(1);
    setClicked(true);
  }

  return (
    <View>
      {clicked ? (
        <ChirpChat id={chatId} />
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
