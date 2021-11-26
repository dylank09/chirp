import React, { useState } from "react";
import { StyleSheet, Image, View, TextInput } from "react-native";

import { theme } from "../assets/Theme";
// import searchIcon from "../assets/logo.png";

export default function SearchBar() {
  return (
    <View style={styles.container}>
      <Image></Image>
      <TextInput style={styles.searchBox} placeholder="Search"></TextInput>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "90%",
    padding: 5,
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: theme.colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  searchBox: {
    color: "black",
    placeholderTextColor: "black",
  },
});
