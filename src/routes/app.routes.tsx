import { Entypo, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { type BottomTabScreenProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { HomeRoutes } from "./home.routes";
import { useToken } from "@gluestack-style/react";
import FinishWorkPage from "@features/work/finish-work.page";
import ReadWorksList from "@features/readWorks/read-works-list";

export type AppTabMenuRoutesParams = {
  Home: undefined;
  FinishWork: undefined;
  WorksReadPage: undefined;
};

export type BottonTabRoute<Route extends keyof AppTabMenuRoutesParams> = BottomTabScreenProps<
  AppTabMenuRoutesParams,
  Route
>;

export const screenDefaultOptions = { headerShown: false };

const { Navigator: TabNavigator, Screen: TabScreen } = createBottomTabNavigator<AppTabMenuRoutesParams>();

const tabIconsMap = {
  Home: <Entypo name="home" size={24} color="white" />,
  FinishWork: <Ionicons name="bookmarks" size={24} color="white" />,
  WorksReadPage: <MaterialCommunityIcons name="book-check" size={24} color="white" />,
};

export const AppRoutes = () => {
  const resolvedBackground = useToken("colors", "blueGray900");

  return (
    <TabNavigator
      initialRouteName="FinishWork"
      screenOptions={({ route }) => ({
        ...screenDefaultOptions,
        tabBarStyle: {
          backgroundColor: resolvedBackground,
        },
        tabBarLabel: () => false,
        tabBarBackground: () => null,
        tabBarIcon: () => tabIconsMap[route.name],
      })}
    >
      <TabScreen name="Home" component={HomeRoutes} />
      <TabScreen name="WorksReadPage" component={ReadWorksList} />
      <TabScreen name="FinishWork" component={FinishWorkPage} />
    </TabNavigator>
  );
};
