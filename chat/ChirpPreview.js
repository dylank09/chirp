import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import FormatTime from "../functions/FormatTime";

import { theme } from "../assets/Theme";

export default function ChirpPreview({
  chatName,
  previewText,
  notOpened,
  previewtimestamp,
  onPress,
}) {
  previewtimestamp = FormatTime(previewtimestamp);

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.chatLogo}>
        <Text
          style={{
            fontSize: 20,
            textAlign: "center",
            fontWeight: notOpened ? "500" : "400",
          }}
        >
          {chatName ? chatName[0] : "E"}
        </Text>
      </View>
      <View>
        <Text style={[styles.name, { fontWeight: notOpened ? "500" : "400" }]}>
          {chatName ? chatName : "Name Err"}
        </Text>
        <Text
          style={[styles.message, { fontWeight: notOpened ? "500" : "400" }]}
        >
          {previewText ? previewText : ""}
        </Text>
      </View>
      <Text
        style={[styles.timestamp, { fontWeight: notOpened ? "500" : "400" }]}
      >
        {previewtimestamp ? previewtimestamp : ""}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    height: 65,
    borderColor: theme.colors.hazeText,
    borderBottomWidth: 1,
    padding: 7,
    alignItems: "center",
  },
  chatLogo: {
    width: 40,
    height: 40,
    margin: 6,
    marginLeft: 2,
    borderRadius: 20,
    backgroundColor: "#8487A5",
    justifyContent: "center",
  },
  name: {
    fontSize: theme.dimensions.standardFontSize + 4,
    color: theme.colors.text,
    fontWeight: "500",
    alignSelf: "flex-start",
  },
  message: {
    fontSize: theme.dimensions.standardFontSize,
    color: theme.colors.text,
    alignSelf: "flex-start",
  },
  timestamp: {
    marginLeft: "auto",
    color: theme.colors.text,
    alignSelf: "center",
  },
});
