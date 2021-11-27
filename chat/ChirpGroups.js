import React, { useState } from "react";
import { StyleSheet, Image, Text, View, SafeAreaView } from "react-native";

import { theme } from "../assets/Theme";
// import logo from "../assets/logo.png";

import firebase from "firebase/app";
import ChirpPreview from "./ChirpPreview";
import SearchBar from "../components/SearchBar";

export default function ChirpGroups() {
  return (
    <SafeAreaView style={styles.container}>
      <SearchBar></SearchBar>
      <Text>This is the group chat view</Text>
      <ChirpPreview></ChirpPreview>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    width: "100%",
    backgroundColor: theme.colors.background,
    alignItems: "center",
    justifyContent: "center",
  },
});
