import React, { useState } from "react";
import { StyleSheet, TextInput, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { theme } from "../assets/Theme";

export default function SendText(props) {
  const [txt, settxt] = useState();

  function sender() {
    if (txt && txt.length > 0) {
      props.send(txt);
      settxt("");
    }
  }

  return (
    <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
      <TextInput
        style={styles.textInput}
        placeholder="message"
        placeholderTextColor="#404040"
        onChangeText={settxt}
        // value={txt}
      ></TextInput>
      <TouchableOpacity style={styles.send} onPress={sender}>
        <Ionicons name="send" size={20} color={theme.colors.text} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    height: theme.dimensions.inputHeight,
    width: "80%",
    backgroundColor: theme.colors.secondary,
    alignItems: "center",
    color: theme.colors.text,
    borderRadius: theme.dimensions.inputHeight / 2,
    padding: 8,
    fontSize: theme.dimensions.standardFontSize + 1,
    paddingLeft: 11,
    marginVertical: 7,
  },
  send: {
    width: theme.dimensions.inputHeight - 1,
    height: theme.dimensions.inputHeight - 1,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.dimensions.inputHeight / 2,
    marginVertical: 7,
    alignItems: "center",
    justifyContent: "center",
  },
});