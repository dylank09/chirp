import React from "react";
import { StyleSheet, TextInput, View, TouchableOpacity } from "react-native";

import { theme } from "../assets/Theme";

export default function SendText() {
  return (
    <View>
      <TextInput style={styles.textInput} placeholder="Message"></TextInput>
      <TouchableOpacity></TouchableOpacity>;
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    height: theme.dimensions.inputHeight,
    width: "85%",
    backgroundColor: theme.colors.secondary,
    alignItems: "center",
    color: theme.colors.text,
  },
  send: {
    width: "10%",
    height: theme.dimensions.inputHeight,
    backgroundColor: theme.colors.primary,
    borderRadius: 18,
  },
});
