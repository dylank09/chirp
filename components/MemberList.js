import React from "react";
import { StyleSheet, ScrollView, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { theme } from "../assets/Theme";

export default function MemberList({ members }) {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Members List</Text>
      {members &&
        members.map((mem, i) => (
          <Text key={i} style={styles.member}>
            {mem}
          </Text>
        ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 20,
    borderBottomColor: theme.colors.jet,
    borderBottomWidth: 1,
  },
  heading: {
    color: theme.colors.text,
    fontSize: theme.dimensions.standardFontSize,
    fontWeight: "bold",
    alignSelf: "center",
    marginTop: 4,
  },
  member: {
    color: theme.colors.text,
    fontSize: theme.dimensions.standardFontSize,
    borderBottomColor: theme.colors.text,
    borderBottomWidth: 0.5,
    padding: 4,
    marginVertical: 5,
  },
});
