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
        maxWidth: "60%",
        borderRadius: 24,
        padding: 5,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 3,
        height: theme.dimensions.inputHeight + 2,
        backgroundColor: me ? theme.colors.primary : theme.colors.secondary,
      }}
    >
      <View style={styles.userAndText}>
        <Text style={styles.user}>{user ? user : "User Sample"}</Text>

        <Text style={styles.text}>{text ? text : "Sample text"}</Text>
      </View>
      <View style={styles.ts}>
        <Text>{timestamp ? timestamp : "16:01"} </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  userAndText: {
    flex: 1,
    marginLeft: 5,
  },
  user: {
    padding: 2,
    alignSelf: "flex-start",
    fontSize: theme.dimensions.standardFontSize - 3,
  },
  text: {
    flex: 1,
    textAlign: "left",
    justifyContent: "flex-start",
    padding: 3,
    alignSelf: "flex-start",
    fontSize: theme.dimensions.standardFontSize,
  },
  ts: {
    alignSelf: "flex-end",
    padding: 2,
    fontSize: theme.dimensions.standardFontSize - 4,
  },
});
