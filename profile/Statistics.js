import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { theme } from "../assets/Theme";

export default function Statistics() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Statistics</Text>
      <Text style={styles.stat}>Created Todos = 4</Text>
      <Text style={styles.stat}>Messages sent = 4</Text>
      <Text style={styles.stat}>Joined projects = 2</Text>
      <Text style={styles.stat}>Completed Todos = 8</Text>
      <Text style={styles.stat}>Assigned Todos = 10</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "85%",
    height: "40%",
    alignSelf: "center",
    borderRadius: 25,
    backgroundColor: theme.colors.jet,
    padding: 5,
    margin: 20,
    justifyContent: "space-around",
    alignItems: "flex-start",
    shadowColor: "rgb(15, 15, 12)",
    shadowOffset: { height: 1.5, width: 1.5 },
    // elevation: 2,
    shadowRadius: 1,
  },
  heading: {
    color: theme.colors.text,
    fontSize: theme.dimensions.standardFontSize + 2,
    fontWeight: "bold",
    width: "100%",
    textAlign: "center",
  },
  stat: {
    color: theme.colors.text,
    fontSize: theme.dimensions.standardFontSize,
    marginLeft: 4,
    marginBottom: 5,
  },
});
