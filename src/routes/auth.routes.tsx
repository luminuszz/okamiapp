import React from "react";
import { createNativeStackNavigator, type NativeStackScreenProps } from "@react-navigation/native-stack";
import LoginPage from "@features/auth/login.page";

export type AuthRoutesParams = {
  LoginPage: undefined;
};

const { Navigator, Screen } = createNativeStackNavigator<AuthRoutesParams>();

export type AuthRoute<Route extends keyof AuthRoutesParams> = NativeStackScreenProps<AuthRoutesParams, Route>;

const screenOptions = { headerShown: false };

export const AuthRoutes = () => (
  <Navigator screenOptions={screenOptions} initialRouteName="LoginPage">
    <Screen name="LoginPage" component={LoginPage} />
  </Navigator>
);
