import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { theme } from "../assets/Theme";
import Login from "./Login";
import Register from "./Register";
import Tutorial from "./Tutorial";

// we use a stack navigator for the auth screens
const Stack = createNativeStackNavigator();

export default function AuthContainer() {
  // in each stack screen we hide the phones header that shows user the app name
  return (
    <NavigationContainer style={styles.container}>
      <Stack.Navigator initialRouteName={"Tutorial"}>
        <Stack.Screen
          name="Tutorial"
          component={Tutorial}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    alignItems: "center",
    justifyContent: "center",
  },
});
