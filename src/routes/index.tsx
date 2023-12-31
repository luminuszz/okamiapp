import React, { useEffect } from "react";
import { AuthRoutes } from "@routes/auth.routes";
import { useAppDispatch, useAppSelector } from "@store/index";
import * as ExpoSplashScreen from "expo-splash-screen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setToken } from "@features/auth/auth.slice";
import { AppRoutes } from "./app.routes";
import { NavigationContainer } from "@react-navigation/native";

export default function Routes() {
  const appDispatch = useAppDispatch();

  const isLogged = useAppSelector((state) => state.auth.token);

  useEffect(() => {
    void ExpoSplashScreen.preventAutoHideAsync().then(async () => {
      const tokenOrNull = await AsyncStorage.getItem("@okami:token");

      if (tokenOrNull) {
        console.log({ tokenOrNull });
        appDispatch(setToken(tokenOrNull));
      }
      await ExpoSplashScreen.hideAsync();
    });
  }, []);

  return <NavigationContainer>{isLogged ? <AppRoutes /> : <AuthRoutes />}</NavigationContainer>;
}
