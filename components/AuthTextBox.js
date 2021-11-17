import React from "react";
import { StyleSheet, TextInput } from "react-native";

import { theme } from "../assets/Theme";

export default function AuthTextBox(props) {
  return (
    <TextInput
      style={styles.textBox}
      //   {...props}
      maxLength={40}
      onChangeText={props.onChange}
      blurOnSubmit={true}
      placeholder={props.placeholder}
    ></TextInput>
  );
}

const styles = StyleSheet.create({
  textBox: {
    // backgroundColor: theme.colors.button,
    padding: 6,
    width: "80%",
    color: theme.colors.text,
    fontSize: 15,
    // borderRadius: 9,
    borderBottomColor: theme.colors.authTextBox,
    borderBottomWidth: 1,
    margin: 10,
  },
});
