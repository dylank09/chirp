import React from "react";
import { StyleSheet, Image, Text, View, SafeAreaView } from "react-native";

import { theme } from "../assets/Theme";

export default function ChirpPreview({
  chatName,
  chatText,
  opened,
  timestamp,
}) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.chatLogo}>
        <Text style={{ fontSize: 20, textAlign: "center", fontWeight: "500" }}>
          C
        </Text>
      </View>
      <Text>This is the a preview of a chat</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    height: 50,
    borderBottomColor: theme.colors.text,
    // backgroundColor: theme.colors.background,
    alignItems: "center",
    justifyContent: "center",
  },
  chatLogo: {
    width: 40,
    height: 40,
    margin: 7,
    borderRadius: 20,
    backgroundColor: "#8487A5",
    justifyContent: "center",
  },
});
