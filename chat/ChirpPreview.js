import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import { theme } from "../assets/Theme";

export default function ChirpPreview({
  chatName,
  chatText,
  opened,
  timestamp,
  onPress,
}) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.chatLogo}>
        <Text style={{ fontSize: 20, textAlign: "center", fontWeight: "500" }}>
          C
        </Text>
      </View>
      <View>
        <Text style={styles.name}>Sample Name</Text>
        <Text style={styles.message}>This is a preview of a chat</Text>
      </View>
      <Text style={styles.timestamp}>29/11</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    height: 65,
    borderColor: "white",
    borderBottomWidth: 1,
    // backgroundColor: theme.colors.background,
    padding: 8,
    alignItems: "center",
  },
  chatLogo: {
    width: 40,
    height: 40,
    margin: 7,
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
    alignSelf: "flex-end",
  },
  timestamp: {
    marginLeft: "auto",
    color: theme.colors.text,
  },
});
