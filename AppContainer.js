import React from "react";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { Dimensions } from "react-native";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";

import ChirpGroups from "./chat/ChirpGroups";
import { theme } from "./assets/Theme";
import Login from "./auth/Login";

const windowWidth = Dimensions.get("window").width;

const bottomTabNavigator = createBottomTabNavigator(
  {
    Chat: {
      screen: ChirpGroups,
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <Ionicons
            name={focused ? "chatbubbles-sharp" : "chatbubbles-outline"}
            size={focused ? 27 : 24}
            color="white"
          />
        ),
      },
    },
    Login: {
      screen: Login,
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <FontAwesome5
            name={focused ? "user-alt" : "user"}
            size={focused ? 27 : 24}
            color="white"
          />
        ),
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
