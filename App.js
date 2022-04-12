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

// Firebase sets some timers for a long period, which will trigger some warnings.
// here we silence logs that match the given string.
LogBox.ignoreLogs([`Setting a timer for a long period`]);

export default function App() {
  // here we use a hook to see if a user is logged in
  const [user, loading] = useAuthState(auth);

  // here we use a hook to get internet connection status
  const netInfo = useNetInfo();

  //if no internet, only the no wifi screen is shown, nothing else.
  if (!netInfo.isConnected) {
    return <NoWifiScreen />;
  }

  // if the user auth state is loading, we show loading screen
  if (loading) {
    return <LoadingScreen />;
  }

  // if the user is null, we return a view with the auth container component
  // if the user is not null (i.e. logged in) we return with the app container component
  return (
    <View style={styles.container}>
      {user ? <AppContainer /> : <AuthContainer />}
    </View>
  );
}

// below is a style sheet. style sheets contain properties with styling that can
// be passed in to the style prop of a component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingTop: StatusBar.currentHeight + 2,
  },
});
