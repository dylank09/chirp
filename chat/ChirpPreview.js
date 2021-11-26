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
        <Text style={{ fontSize: 10, textAlign: "center", fontWeight: "600" }}>
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
    width: "100%",
    height: 50,
    borderBottomColor: theme.colors.text,
    // backgroundColor: theme.colors.background,
    alignItems: "center",
    justifyContent: "center",
  },
  chatLogo: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#8487A5",
    justifyContent: "center",
  },
});
