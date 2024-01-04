import { Box, Spinner } from "@gluestack-ui/themed";
import { NavigationContainer } from "@react-navigation/native";
import { AuthRoutes } from "@routes/auth.routes";
import { isLoggedAtom, storageTokenLoadableAtom } from "@store/auth";
import { useAtomValue } from "jotai";
import React from "react";
import { AppRoutes } from "./app.routes";

const AppLoading = () => {
  return (
    <Box backgroundColor="$blueGray900" flex={1} w="$full" h="$full" justifyContent="center" alignItems="center">
      <Spinner size="large" color="$secondary100" />
    </Box>
  );
};

export default function Routes() {
  const { state: tokenStatus } = useAtomValue(storageTokenLoadableAtom);

  const isLogged = useAtomValue(isLoggedAtom);

  if (tokenStatus === "loading") return <AppLoading />;

  return <NavigationContainer>{isLogged ? <AppRoutes /> : <AuthRoutes />}</NavigationContainer>;
}
