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
    padding: 10,
    margin: 10,
    borderRadius: 18,
    width: "90%",
    alignItems: "center",
    height: theme.dimensions.buttonHeight,
    backgroundColor: theme.colors.primary,
    justifyContent: "center",
  },
  searchBox: {
    color: "black",
    placeholderTextColor: "black",
    fontSize: theme.dimensions.standardFontSize + 2,
  },
});
