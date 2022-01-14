import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { theme } from "../assets/Theme";

export default function ProjectPreview({
  projectName,
  nextTodo,
  onPress,
  remaining,
}) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.left}>
        <Text style={styles.name}>{projectName ? projectName : ""}</Text>
        <Text style={styles.todo}>Todo: {nextTodo ? nextTodo : ""}</Text>
      </View>
      {remaining ? (
        <View style={styles.right}>
          <MaterialCommunityIcons
            name="timer-sand-full"
            size={20}
            color="white"
          />
          <Text style={styles.remaining}>{remaining}</Text>
        </View>
      ) : (
        <></>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "90%",
    height: 60,
    borderRadius: 25,
    backgroundColor: theme.colors.jet,
    padding: 5,
    margin: 5,
    alignSelf: "center",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "rgb(15, 15, 12)",
    shadowOffset: { height: 1.5, width: 1.5 },
    elevation: 2,
    shadowRadius: 1,
  },
  left: {
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
  name: {
    fontSize: theme.dimensions.standardFontSize + 3,
    color: theme.colors.text,
    fontWeight: "500",
    alignSelf: "flex-start",
    paddingLeft: 10,
  },
  todo: {
    fontSize: theme.dimensions.standardFontSize - 2,
    color: theme.colors.text,
    fontWeight: "400",
    // alignSelf: "flex-end",
    paddingLeft: 10,
  },
  right: {
    flexDirection: "row",
  },
  remaining: {
    fontSize: theme.dimensions.standardFontSize + 2,
    color: theme.colors.text,
    fontWeight: "500",
    paddingLeft: 2,
    paddingRight: 3,
  },
});
