import React from "react";
import { StyleSheet, View, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { theme } from "../assets/Theme";

export default function SearchBar({ onChange }) {
  return (
    <View style={styles.container}>
      <Ionicons
        name="search"
        size={24}
        color="white"
        style={{ alignSelf: "center" }}
      />
      <TextInput
        style={styles.searchBox}
        onChangeText={onChange}
        placeholder="Search"
        placeholderTextColor="white"
      ></TextInput>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 10,
    borderRadius: (theme.dimensions.inputHeight + 2) / 2,
    width: "80%",
    height: theme.dimensions.inputHeight + 2,
    backgroundColor: theme.colors.primary,
    justifyContent: "flex-start",
  },
  searchBox: {
    color: "white",
    marginLeft: 10,
    fontSize: theme.dimensions.standardFontSize + 2,
    width: "80%",
  },
});
