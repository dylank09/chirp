import React from "react";
import { StyleSheet, TextInput } from "react-native";

import { theme } from "../assets/Theme";

export default function AuthTextBox(props) {
  return (
    <TextInput
      style={styles.textBox}
      //   {...props}
      maxLength={40}
      onChangeText={props.onChangeText}
      blurOnSubmit={true}
      placeholder={props.placeholder}
    ></TextInput>
  );
}

const styles = StyleSheet.create({
  textBox: {
    padding: 5,
    width: theme.dimensions.authWidth,
    color: theme.colors.text,
    fontSize: theme.dimensions.standardFontSize,
    borderBottomColor: theme.colors.authTextBox,
    borderBottomWidth: 1,
    marginTop: 7,
    marginBottom: 5,
    placeholderTextColor: theme.colors.placeholderColor,
  },
});
