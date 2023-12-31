import { registerRootComponent } from 'expo';
import { notificationService } from "@services/notifications";

import App from "./src/App";

void notificationService().then(() => {
  console.log("Notification service started");
});


registerRootComponent(App);
