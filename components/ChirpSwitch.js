import React, { useState } from "react";
import { View, Text, Switch, StyleSheet } from "react-native";
import { theme } from "../assets/Theme";

export default function App({ text, value, func }) {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
    func(!isEnabled);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text ? text : ""}</Text>
      <Switch
        trackColor={{ false: "#767577", true: "#9c5a60" }}
        thumbColor={isEnabled ? "rgb(193, 73, 83)" : "#767577"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
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
