import React from "react";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { Dimensions } from "react-native";
import {
  Ionicons,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

import ChirpGroups from "./chats/ChirpGroups";
import { theme } from "./assets/Theme";
import ChirpProfile from "./profile/ChirpProfile";
import ChirpProjects from "./projects/ChirpProjects";

const windowWidth = Dimensions.get("window").width;

const bottomTabNavigator = createBottomTabNavigator(
  {
    Chat: {
      screen: ChirpGroups,
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <Ionicons
            name={focused ? "ios-chatbubble-sharp" : "ios-chatbubble-outline"}
            size={focused ? 27 : 24}
            color="white"
          />
        ),
      },
    },
    Projects: {
      screen: ChirpProjects,
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <MaterialCommunityIcons
            name={focused ? "briefcase-clock" : "briefcase-clock-outline"}
            size={focused ? 27 : 24}
            color="white"
          />
        ),
      },
    },
    Profile: {
      screen: ChirpProfile,
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
      activeTintColor: theme.colors.hazeText,
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
