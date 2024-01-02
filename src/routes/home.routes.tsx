import React from "react";
import HomePage from "@features/home/home.page";
import UpdateChapterPage from "@features/home/updateChapter.page";
import UserPage from "@features/user/user.page";
import UpdateWorkPage from "@features/work/update-work.page";
import { type NativeStackScreenProps, createNativeStackNavigator } from "@react-navigation/native-stack";

export type HomeRoutesParams = {
  HomeScreen: undefined;
  UpdateChapter: {
    workId: string;
    chapter: number;
  };
  UpdateWorkPage: {
    workId: string;
  };
  MarkWorkFinishedPage: undefined;
  UserDetails: undefined;
};

export type HomeRoute<Route extends keyof HomeRoutesParams> = NativeStackScreenProps<HomeRoutesParams, Route>;

const { Screen, Navigator } = createNativeStackNavigator<HomeRoutesParams>();

export const HomeRoutes = () => {
  return (
    <Navigator screenOptions={{ headerShown: false }} initialRouteName="HomeScreen">
      <Screen name="HomeScreen" component={HomePage} />
      <Screen name="UpdateChapter" component={UpdateChapterPage} />
      <Screen name="UpdateWorkPage" component={UpdateWorkPage} />
      <Screen name="UserDetails" component={UserPage} />
    </Navigator>
  );
};
