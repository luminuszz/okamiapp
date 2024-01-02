import { LogLevel, OneSignal } from "react-native-onesignal";

import { ONE_SIGNAL_APP_ID } from "@env";
import { storageService } from "@services/localstorage";

export const notificationService = async (): Promise<void> => {
  let hasPermissions: boolean;

  if (ONE_SIGNAL_APP_ID) {
    OneSignal.initialize(ONE_SIGNAL_APP_ID);
    OneSignal.Debug.setLogLevel(LogLevel.Verbose);

    hasPermissions = OneSignal.Notifications.hasPermission();

    if (!hasPermissions) {
      hasPermissions = await OneSignal.Notifications.requestPermission(true);
    }

    if (hasPermissions) {
      OneSignal.Notifications.addEventListener("click", (event) => {});

      const userEmail = await storageService.get<string>("email");

      if (userEmail) {
        OneSignal.User.addEmail(userEmail);
      }
    }
  }
};
