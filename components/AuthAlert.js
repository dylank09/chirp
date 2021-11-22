import React from "react";
import { StyleSheet, Text } from "react-native";
import { useState } from "react";

import { theme } from "../assets/Theme";

export default function AuthAlert(props) {
  function bla(event) {
    console.log(event);
  }

  return (
    <Text style={styles.alert} onLayout={(event) => bla}>
      {props.text ? props.text : " "}
    </Text>
  );
}

const styles = StyleSheet.create({
  alert: {
    paddingLeft: 3,
    width: theme.dimensions.authWidth,
    height: 15,
    color: theme.colors.alertText,
    fontSize: 11,
    margin: 0,
  },
});
