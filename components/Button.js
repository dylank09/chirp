import React from "react";
import { StyleSheet, Text } from "react-native";

import { theme } from "../assets/Theme";

export default function Button(text, onPress) {
  return (
    <TouchableOpacity
      onPress={() => alert("Hello, world!")}
      style={styles.button}
    >
      <Text style={styles.buttonText}>{text ? text : "NO TEXT PASSED"}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.button,
    padding: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: theme.buttonText,
    fontSize: 20,
  },
});
