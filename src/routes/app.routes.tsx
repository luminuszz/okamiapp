import { Entypo } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { HomeRoutes } from "./home.routes";

export type AppTabMenuRoutesParams = {
  Home: undefined;
};

export const screenDefaultOptions = { headerShown: false };

const { Navigator: TabNavigator, Screen: TabScreen } = createBottomTabNavigator<AppTabMenuRoutesParams>();

const tabIconsMap = {
  Home: <Entypo name="home" size={24} color="black" />,
};

export const AppRoutes = () => (
  <TabNavigator
    initialRouteName="Home"
    screenOptions={({ route }) => ({
      ...screenDefaultOptions,
      tabBarIcon: () => tabIconsMap[route.name],
    })}
  >
    <TabScreen name="Home" component={HomeRoutes} />
  </TabNavigator>
);
