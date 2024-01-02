import { Entypo, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { type BottomTabScreenProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { HomeRoutes } from "./home.routes";
import { useToken } from "@gluestack-style/react";
import FinishWorkPage from "@features/work/finish-work.page";
import ReadWorksList from "@features/readWorks/read-works.page";

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
  Home: (color: string) => <Entypo name="home" size={24} color={color} />,
  FinishWork: (color: string) => <Ionicons name="bookmarks" size={24} color={color} />,
  WorksReadPage: (color: string) => <MaterialCommunityIcons name="book-check" size={24} color={color} />,
};

export const AppRoutes = () => {
  const resolvedBackground = useToken("colors", "blueGray900");
  const resolvedFocusIconColor = useToken("colors", "primary600");
  const resolvedInactiveColor = useToken("colors", "blueGray400");

  return (
    <TabNavigator
      initialRouteName="Home"
      screenOptions={({ route, navigation }) => ({
        ...screenDefaultOptions,
        tabBarStyle: {
          backgroundColor: resolvedBackground,
        },
        tabBarLabel: () => false,
        tabBarBackground: () => null,
        tabBarIcon: ({ color }) => tabIconsMap[route.name](color),
        tabBarActiveTintColor: resolvedFocusIconColor,
        tabBarInactiveTintColor: resolvedInactiveColor,
      })}
    >
      <TabScreen name="Home" component={HomeRoutes} />
      <TabScreen name="WorksReadPage" component={ReadWorksList} />
      <TabScreen name="FinishWork" component={FinishWorkPage} />
    </TabNavigator>
  );
};
