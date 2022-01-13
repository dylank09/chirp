import React from "react";
import { StyleSheet, TouchableOpacity, Text, Image } from "react-native";
import googleLogo from "../assets/google-logo.png";
import { theme } from "../assets/Theme";

export default function AuthProviderButton(props) {
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.button}>
      <Image
        style={styles.buttonLogo}
        source={props.type == "google" ? googleLogo : ""}
      ></Image>
      <Text style={styles.buttonText}>{props.text ? props.text : "  "} </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    justifyContent: "center",
    width: theme.dimensions.authButtonWidth,
    // height: theme.dimensions.buttonHeight,
    paddingTop: 7,
    paddingBottom: 7,
    paddingLeft: 15,
    paddingRight: 15,
    margin: 8,
    backgroundColor: "white",
    borderRadius: 18,
    alignItems: "center",
  },
  buttonText: {
    marginLeft: 5,
    color: "black",
    fontWeight: "600",
  },
  buttonLogo: {
    height: 19,
    width: 19,
    margin: 3,
  },
});
