import React from "react";
import { StyleSheet, View, Image } from "react-native";

import { theme } from "../assets/Theme";
import logo from "../assets/loading.gif";

export default function LoadingScreen() {
  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.img}></Image>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    width: 112,
    height: 120,
  },
});
