import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { theme } from "../assets/Theme";

export default function NoWifiScreen() {
  return (
    <View style={styles.container} testID="loading">
      <MaterialCommunityIcons name="wifi-off" size={65} color="white" />
      <Text style={styles.text}>{"\n"}No internet connection detected</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
  },
});
