import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { theme } from "../assets/Theme";

export default function Message({ text, timestamp, user, me }) {
  if (timestamp) {
    var t = new Date(1970, 0, 1); // Epoch
    t.setSeconds(timestamp);
    let today = new Date().toLocaleString() + "";
    timestamp = t.toLocaleString() + "";

    if (today.slice(0, 10) == timestamp.slice(0, 10)) {
      timestamp = timestamp.slice(12, 17);
    } else {
      timestamp = timestamp.slice(0, 5);
    }
  } else {
    timestamp = "";
  }

  return (
    <View style={styles.row}>
      <View
        style={[
          styles.messageBox,
          {
            alignSelf: me ? "flex-end" : "flex-start",
            backgroundColor: me ? theme.colors.primary : theme.colors.secondary,
            textAlign: me ? "right" : "left",
          },
        ]}
      >
        <View style={styles.userAndTime}>
          <Text style={styles.user}>{user ? user : ""}</Text>
          <Text style={styles.ts}>{timestamp} </Text>
        </View>
        <Text style={[styles.text, { textAlign: me ? "right" : "left" }]}>
          {text ? text : ""}
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
    marginRight: 2,
    fontWeight: "700",
    fontSize: theme.dimensions.standardFontSize - 4,
  },
  ts: {
    alignSelf: "flex-start",
    marginLeft: 2,
    color: theme.colors.jet,
    fontWeight: "700",
    fontSize: theme.dimensions.standardFontSize - 4,
  },
  text: {
    justifyContent: "flex-start",
    color: theme.colors.text,
    padding: 4,
    alignSelf: "flex-start",
    fontSize: theme.dimensions.standardFontSize,
  },
});
