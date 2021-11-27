import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { Dimensions } from "react-native";

import ChirpGroups from "./chat/ChirpGroups";
import { theme } from "./assets/Theme";
import Login from "./auth/Login";

const windowWidth = Dimensions.get("window").width;

const bottomTabNavigator = createBottomTabNavigator(
  {
    Chat: ChirpGroups,
    Login: Login,
  },
  {
    initialRouteName: "Chat",
    tabBarOptions: {
      activeTintColor: theme.colors.navBarTint,
      labelStyle: {
        fontSize: 16,
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
