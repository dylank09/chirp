import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import { theme } from "../assets/Theme";

export default function Button(props) {
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.button}>
      <Text style={styles.buttonText}>{props.text ? props.text : "  "} </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.button,
    padding: 10,
    borderRadius: 18,
    width: theme.dimensions.buttonWidth,
    alignItems: "center",
    height: theme.dimensions.buttonHeight,
  },
  buttonText: {
    color: theme.colors.buttonText,
    fontSize: 15,
  },
});
