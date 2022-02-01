import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import { theme } from "../assets/Theme";

export default function Header({ name, onPress }) {
  return (
    <View style={styles.header}>
      <AntDesign name="left" size={24} color="white" onPress={onPress} />
      <Text style={styles.chatName}>{name}</Text>
      <AntDesign name="back" size={24} color={theme.colors.background} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    width: "90%",
    justifyContent: "space-between",
    marginTop: 20,
    marginBottom: 20,
    alignSelf: "center",
  },
  chatName: {
    color: theme.colors.text,
    fontWeight: "bold",
    fontSize: theme.dimensions.standardFontSize + 2,
  },
});
