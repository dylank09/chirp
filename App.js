import React from "react";
import { StatusBar, StyleSheet, View, LogBox } from "react-native";
import { useNetInfo } from "@react-native-community/netinfo";

import { theme } from "./assets/Theme";
import AppContainer from "./AppContainer";
import AuthContainer from "./auth/AuthContainer";
import LoadingScreen from "./components/LoadingScreen";

import { useAuthState } from "react-firebase-hooks/auth";

import auth from "./config/FirebaseAuthInit";
import NoWifiScreen from "./components/NoWifiScreen";

// Firebase sets some timeers for a long period, which will trigger some warnings. Let's turn that off for this example
LogBox.ignoreLogs([`Setting a timer for a long period`]);

export default function App() {
  const [user, loading] = useAuthState(auth);
  const netInfo = useNetInfo();

  if (!netInfo.isConnected) {
    return <NoWifiScreen />;
  }

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <View style={styles.container}>
      {user ? <AppContainer /> : <AuthContainer />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingTop: StatusBar.currentHeight + 2,
  },
});
