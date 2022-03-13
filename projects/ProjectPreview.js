import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";

import { theme } from "../assets/Theme";

export default function ProjectPreview({
  projectName,
  nextTodo,
  onPress,
  remaining,
  done,
}) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.left}>
        <Text
          style={[
            styles.name,
            done
              ? {
                  textDecorationLine: "line-through",
                  textDecorationStyle: "solid",
                  textDecorationColor: "white",
                  fontWeight: "normal",
                }
              : {},
          ]}
        >
          {projectName ? projectName : ""}
        </Text>
        <Text style={styles.todo}>
          {nextTodo && !done ? "Todo: " + nextTodo : ""}
        </Text>
      </View>
      {remaining && !done ? (
        <View style={styles.right}>
          <MaterialCommunityIcons name="timer-sand" size={18} color="white" />
          <Text style={styles.remaining}>{remaining}</Text>
        </View>
      ) : (
        <View style={{ paddingRight: 15 }}>
          <Ionicons name="checkmark-done" size={30} color="white" />
        </View>
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
    margin: 10,
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
    fontWeight: "bold",
    alignSelf: "flex-start",
    paddingLeft: 10,
  },
  todo: {
    fontSize: theme.dimensions.standardFontSize - 2,
    color: theme.colors.text,
    fontWeight: "normal",
    paddingLeft: 10,
  },
  right: {
    flexDirection: "row",
  },
  remaining: {
    fontSize: theme.dimensions.standardFontSize,
    color: theme.colors.text,
    fontWeight: "bold",
    paddingLeft: 6,
    paddingRight: 3,
  },
});
