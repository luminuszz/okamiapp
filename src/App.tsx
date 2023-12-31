import { StatusBar } from "expo-status-bar";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import Routes from "@routes/index";
import { Provider } from "react-redux";
import Store from "@store/index";
import { config } from "@gluestack-ui/config";

export default function App() {
  return (
    <Provider store={Store}>
      <StatusBar style="dark" />
      <GluestackUIProvider config={config}>
        <Routes />
      </GluestackUIProvider>
    </Provider>
  );
}
