import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { theme } from "../assets/Theme";

export default function Message({ text, timestamp, user, me }) {
  return (
    <View style={styles.row}>
      <View
        style={[
          styles.messageBox,
          {
            alignSelf: me ? "flex-end" : "flex-start",
            backgroundColor: me ? theme.colors.primary : theme.colors.secondary,
          },
        ]}
      >
        <View style={styles.userAndTime}>
          <Text style={styles.user}>{user ? user : "User Sample"}</Text>
          <Text style={styles.ts}>{timestamp ? timestamp : "16:01"} </Text>
        </View>
        <Text style={styles.text}>
          {text
            ? text
            : "Sample text bla bla bla bla bla extra extra extra extra"}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    width: "100%",
    alignContent: "flex-start",
    marginBottom: 5,
  },
  messageBox: {
    borderRadius: theme.dimensions.inputHeight / 2,
    flexDirection: "column",
    maxWidth: "60%",
    padding: 6,
    marginHorizontal: 4,
  },
  userAndTime: {
    flexDirection: "row",
    marginLeft: 4,
    justifyContent: "space-between",
  },
  user: {
    color: theme.colors.jet,
    alignSelf: "flex-start",
    fontWeight: "700",
    fontSize: theme.dimensions.standardFontSize - 4,
  },
  ts: {
    alignSelf: "flex-start",
    color: theme.colors.jet,
    fontWeight: "700",
    fontSize: theme.dimensions.standardFontSize - 4,
  },
  text: {
    textAlign: "left",
    justifyContent: "flex-start",
    color: theme.colors.text,
    padding: 4,
    alignSelf: "flex-start",
    fontSize: theme.dimensions.standardFontSize,
  },
});
