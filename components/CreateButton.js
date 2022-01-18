import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { theme } from "../assets/Theme";

export default function CreateButton(props) {
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.button}>
      <MaterialIcons name="create" size={24} color="white" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: (theme.dimensions.inputHeight + 2) / 2,
    alignItems: "center",
    justifyContent: "center",
    height: theme.dimensions.inputHeight + 2,
    width: theme.dimensions.inputHeight + 2,
  },
});
