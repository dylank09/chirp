import React from "react";
import { StyleSheet, View, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { theme } from "../assets/Theme";

export default function SearchBar() {
  return (
    <View style={styles.container}>
      <Ionicons name="search" size={24} color="black" />
      <TextInput style={styles.searchBox} placeholder="Search"></TextInput>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 10,
    marginTop: 20,
    marginBottom: 25,
    borderRadius: 23,
    width: "90%",
    // alignItems: "center",
    height: theme.dimensions.buttonHeight + 10,
    backgroundColor: theme.colors.primary,
    justifyContent: "flex-start",
  },
  searchBox: {
    color: "black",
    marginLeft: 10,
    placeholderTextColor: "black",
    fontSize: theme.dimensions.standardFontSize + 2,
    width: "80%",
  },
});
