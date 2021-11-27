import React from "react";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import ChirpGroups from "./chat/ChirpGroups";
import { theme } from "./assets/Theme";
import Login from "./auth/Login";

const windowWidth = Dimensions.get("window").width;

const bottomTabNavigator = createBottomTabNavigator(
  {
    Chat: {
      screen: ChirpGroups,
      navigationOptions: {
        tabBarIcon: (
          <Ionicons name="chatbubbles-sharp" size={24} color="white" />
        ),
      },
    },
    Login: {
      screen: Login,
      navigationOptions: {
        tabBarIcon: <Ionicons name="search" size={24} color="white" />,
      },
    },
  },
  {
    initialRouteName: "Chat",
    tabBarOptions: {
      activeTintColor: theme.colors.navBarTint,
      labelStyle: {
        fontSize: 0,
      },
      style: {
        backgroundColor: theme.colors.background,
        width: windowWidth,
      },
    },
  }
);

const AppContainer = createAppContainer(bottomTabNavigator);

export default AppContainer;
