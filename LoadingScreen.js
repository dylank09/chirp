import React from "react";
import { StyleSheet, View } from "react-native";

import { theme } from "./assets/Theme";

export default function LoadingScreen() {
  return <View style={styles.container}>Loading</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
});
