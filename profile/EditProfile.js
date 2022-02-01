import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView, Image } from "react-native";

import { theme } from "../assets/Theme";
import Header from "../components/Header";

export default function EditProfile({ userData, userRef, onBackPress }) {
  const [name, setName] = useState(userData.name);

  function saveProfileInfo() {}

  return (
    <ScrollView style={styles.container}>
      <Header name="Edit Profile" onPress={onBackPress} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
});
