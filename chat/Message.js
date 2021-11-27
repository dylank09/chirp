import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { theme } from "../assets/Theme";

import firebase from "firebase/app";

export default function Message({ text, timestamp, user, me }) {
  return (
    <View
      style={{
        flexDirection: "row",
        minWidth: "50",
        borderRadius: 18,
        padding: 5,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 3,
        height: theme.dimensions.inputHeight + 5,
        backgroundColor: me ? theme.colors.primary : theme.colors.secondary,
      }}
    >
      <Text style={styles.user}>{user ? user : "U"}</Text>
      <Text style={styles.text}>{text ? text : "Sample text"}</Text>
      <Text style={styles.ts}>{timestamp ? timestamp : "16:01"} </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  user: {
    padding: 4,
    alignSelf: "flex-start",
  },
  text: {
    padding: 4,
    alignSelf: "flex-end",
    fontSize: theme.dimensions.standardFontSize + 3,
  },
  ts: {
    padding: 2,
  },
});
