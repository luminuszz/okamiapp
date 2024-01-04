import { NavigationContainer } from "@react-navigation/native";
import { AuthRoutes } from "@routes/auth.routes";
import { isLoggedAtom, storageTokenLoadableAtom } from "@store/auth";
import * as ExpoSplashScreen from "expo-splash-screen";
import { useAtomValue } from "jotai";
import React, { useEffect } from "react";
import { AppRoutes } from "./app.routes";

export default function Routes() {
  const { state: tokenStatus } = useAtomValue(storageTokenLoadableAtom);

  const isLogged = useAtomValue(isLoggedAtom);

  useEffect(() => {
    void ExpoSplashScreen.preventAutoHideAsync().then(async () => {
      if (tokenStatus !== "loading") {
        await ExpoSplashScreen.hideAsync();
      }
    });
  }, [tokenStatus]);

  return <NavigationContainer>{isLogged ? <AppRoutes /> : <AuthRoutes />}</NavigationContainer>;
}
