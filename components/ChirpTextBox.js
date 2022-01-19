import React from "react";
import { StyleSheet, TextInput } from "react-native";

import { theme } from "../assets/Theme";

export default function ChirpTextBox({
  onChangeText,
  value,
  placeholder,
  password,
}) {
  return (
    <TextInput
      style={styles.textBox}
      maxLength={40}
      value={value}
      onChangeText={onChangeText ? onChangeText : null}
      secureTextEntry={password ? true : false}
      selectTextOnFocus={password ? true : false}
      selectionColor={theme.colors.primary}
      multiline={false}
      blurOnSubmit={true}
      placeholder={placeholder ? placeholder : ""}
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
