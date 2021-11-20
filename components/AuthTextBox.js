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
    // backgroundColor: theme.colors.button,
    padding: 6,
    width: theme.dimensions.authWidth,
    color: theme.colors.text,
    fontSize: theme.dimensions.standardFontSize,
    // borderRadius: 9,
    borderBottomColor: theme.colors.authTextBox,
    borderBottomWidth: 1,
    marginTop: 10,
    marginBottom: 5,
  },
});
