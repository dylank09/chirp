import React from "react";
import { StyleSheet, Image, Text, View, SafeAreaView } from "react-native";

import { theme } from "../assets/Theme";
import Message from "./Message";
import SendText from "./SendText";

import firebase from "firebase/app";

export default function ChirpChat({ id }) {
  return (
    <View style={styles.container}>
      <View>
        <Text>Name of Chat, ID: {id} </Text>
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
});
