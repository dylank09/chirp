import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { theme } from "../assets/Theme";

import firebase from "firebase/app";

export default function Message({ text, timestamp, user, me }) {
  return (
    <View style={styles.row}>
      <View style={styles.messageBox}>
        <View style={styles.userAndText}>
          <Text style={styles.user}>{user ? user : "User Sample"}</Text>

          <Text style={styles.text}>{text ? text : "Sample text"}</Text>
        </View>
        <Text style={styles.ts}>{timestamp ? timestamp : "16:01"} </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    width: "100%",
    alignContent: "flex-start",
  },
  messageBox: {
    borderRadius: theme.dimensions.inputHeight / 2,
    alignSelf: "flex-start",
    flexDirection: "row",
    maxWidth: "60%",
    padding: 6,
    marginLeft: 4,
    height: theme.dimensions.inputHeight,
    backgroundColor: theme.colors.secondary,
  },
  userAndText: {
    marginLeft: 4,
  },
  user: {
    padding: 2,
    color: theme.colors.text,
    alignSelf: "flex-start",
    fontSize: theme.dimensions.standardFontSize - 3,
  },
  text: {
    textAlign: "left",
    justifyContent: "flex-start",
    color: theme.colors.text,
    padding: 2,
    alignSelf: "flex-start",
    fontSize: theme.dimensions.standardFontSize,
  },
  ts: {
    alignSelf: "flex-start",
    paddingTop: 2,
    color: theme.colors.text,
    fontSize: theme.dimensions.standardFontSize - 4,
  },
});
