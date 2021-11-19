import React from "react";
import { StyleSheet, Text } from "react-native";

import { theme } from "../assets/Theme";

export default function AuthAlert(props) {
  return <Text style={styles.alert}>{props.text ? props.text : " "}</Text>;
}

const styles = StyleSheet.create({
  alert: {
    paddingLeft: 6,
    width: "70%",
    height: 15,
    color: theme.colors.alertText,
    fontSize: 12,
    margin: 0,
  },
});
