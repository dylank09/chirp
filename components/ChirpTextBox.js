import React from "react";
import { StyleSheet, TextInput } from "react-native";

import { theme } from "../assets/Theme";

export default function ChirpTextBox(props) {
  return (
    <TextInput
      style={styles.textBox}
      maxLength={40}
      onChangeText={props.onChangeText}
      blurOnSubmit={true}
      placeholder={props.placeholder}
      placeholderTextColor={theme.colors.placeholderColor}
    ></TextInput>
  );
}

const styles = StyleSheet.create({
  textBox: {
    padding: 5,
    width: theme.dimensions.authWidth,
    color: theme.colors.text,
    fontSize: theme.dimensions.standardFontSize + 1,
    borderBottomColor: theme.colors.text,
    borderBottomWidth: 1,
    marginTop: 7,
    marginBottom: 5,
  },
});
