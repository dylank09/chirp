import React from "react";
import { View, Text, Switch, StyleSheet } from "react-native";

import { theme } from "../assets/Theme";

export default function ChirpSwitch({ text, value, setValue }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text ? text : ""}</Text>
      <Switch
        style={{ marginLeft: 5 }}
        trackColor={{ false: "#767577", true: "#9c5a60" }}
        thumbColor={value ? "rgb(193, 73, 83)" : "#767577"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={setValue}
        value={value}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 5,
    padding: 2,
  },
  text: {
    color: theme.colors.text,
    fontSize: theme.dimensions.standardFontSize + 2,
  },
});
