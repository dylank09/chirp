import React from "react";
import { StyleSheet, ScrollView, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import { theme } from "../assets/Theme";

export default function MemberList({ members, fsRef, admin }) {
  function deleteMember(member) {
    var newMembers = members.filter((mem) => mem !== member);
    fsRef.update({
      members: newMembers,
    });
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Members List</Text>
      {members &&
        members.map((mem, i) => (
          <View key={i} style={styles.memberContainer}>
            {mem === admin ? (
              <Text style={styles.adminMember}>{mem}</Text>
            ) : (
              <View style={styles.regularMember}>
                <Text style={styles.member}>{mem}</Text>
                <AntDesign
                  name="delete"
                  size={16}
                  color={theme.colors.hazeText}
                  onPress={() => deleteMember(mem)}
                />
              </View>
            )}
          </View>
        ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
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
    borderBottomColor: theme.colors.text,
    borderBottomWidth: 0.5,
    padding: 4,
    marginVertical: 5,
    width: "100%",
  },
  regularMember: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  member: {
    color: theme.colors.text,
    fontSize: theme.dimensions.standardFontSize,
  },
  adminMember: {
    color: theme.colors.hazeText,
    fontSize: theme.dimensions.standardFontSize,
  },
});
