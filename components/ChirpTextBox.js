import React from "react";
import { StyleSheet, TextInput } from "react-native";

import { theme } from "../assets/Theme";

export default function ChirpTextBox({
  onChangeText,
  value,
  placeholder,
  password,
  allowMultiline,
  smallVersion,
  testID,
}) {
  return (
    <TextInput
      style={[
        styles.textBox,
        {
          padding: smallVersion ? 3 : 5,
          fontSize: smallVersion ? 14 : 15,
          marginTop: smallVersion ? 5 : 7,
          marginBottom: smallVersion ? 3 : 4,
        },
      ]}
      value={value}
      onChangeText={onChangeText ? onChangeText : null}
      secureTextEntry={password ? true : false}
      selectTextOnFocus={password ? true : false}
      selectionColor={theme.colors.primary}
      multiline={allowMultiline ? allowMultiline : false}
      blurOnSubmit={true}
      placeholder={placeholder ? placeholder : ""}
      placeholderTextColor={theme.colors.placeholderColor}
      testID={testID ? testID : "chirpTextBox"}
    ></TextInput>
  );
}

const styles = StyleSheet.create({
  textBox: {
    width: "82%",
    color: theme.colors.text,
    borderBottomColor: theme.colors.text,
    borderBottomWidth: 1,
  },
});
