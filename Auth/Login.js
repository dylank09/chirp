import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { theme } from "../assets/Theme";
import Button from "../components/Button";

import "firebase/auth";
import AuthTextBox from "../components/AuthTextBox";

export default function Login() {
  return (
    <View style={styles.container}>
      <Text>LOGIN</Text>
      <AuthTextBox placeholder="Email"></AuthTextBox>
      <AuthTextBox placeholder="Password"></AuthTextBox>
      <Button text="Continue"></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: theme.colors.background,
    alignItems: "center",
    justifyContent: "center",
  },
});
