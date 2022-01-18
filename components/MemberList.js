import React from "react";
import { StyleSheet, ScrollView, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import { theme } from "../assets/Theme";

export default function MemberList({ members, fsRef }) {
  function deleteMember(member) {
    console.log(member);
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Members List</Text>
      {members &&
        members.map((mem, i) => (
          <View key={i} style={styles.memberContainer}>
            <Text style={styles.member}>{mem}</Text>
            <AntDesign
              name="delete"
              size={16}
              color="white"
              onPress={() => deleteMember(mem)}
            />
          </View>
        ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    marginBottom: 15,
  },
  heading: {
    color: theme.colors.text,
    fontSize: theme.dimensions.standardFontSize,
    fontWeight: "bold",
    alignSelf: "center",
    marginTop: 4,
  },
  memberContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: theme.colors.text,
    borderBottomWidth: 0.5,
    padding: 4,
    marginVertical: 5,
  },
  member: {
    color: theme.colors.text,
    fontSize: theme.dimensions.standardFontSize,
  },
});
