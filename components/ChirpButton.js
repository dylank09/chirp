import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import { theme } from "../assets/Theme";

export default function ChirpButton(props) {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[styles.button, { width: props.width }]}
      testID={props.testID ? props.testID : "button"}
    >
      <Text style={styles.buttonText}>{props.text ? props.text : "  "} </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.primary,
    padding: 10,
    margin: 10,
    borderRadius: 18,
    alignItems: "center",
    height: theme.dimensions.buttonHeight,
  },
  buttonText: {
    color: theme.colors.text,
    fontSize: theme.dimensions.standardFontSize,
  },
});
