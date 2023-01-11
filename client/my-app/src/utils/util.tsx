import { Intent } from "@blueprintjs/core";
import { AppToaster } from "../App";

export function createToast(message: string, intent: Intent, duration = 5000 ) {
  AppToaster.show({
    message: message,
    intent: intent,
    timeout: 5000
  })
}