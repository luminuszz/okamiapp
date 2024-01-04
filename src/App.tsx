import { config } from "@gluestack-ui/config";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Routes from "@routes/index";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { QueryClient } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { StatusBar } from "expo-status-bar";
import React from "react";

export default function App() {
  const queryClient = new QueryClient();

  const asyncStoragePersister = createAsyncStoragePersister({
    storage: AsyncStorage,
  });

  return (
    <PersistQueryClientProvider client={queryClient} persistOptions={{ persister: asyncStoragePersister }}>
      <StatusBar style="dark" />
      <GluestackUIProvider config={config}>
        <Routes />
      </GluestackUIProvider>
    </PersistQueryClientProvider>
  );
}
