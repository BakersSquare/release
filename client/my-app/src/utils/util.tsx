import { Intent } from "@blueprintjs/core";
import * as fs from 'fs'
import { AppToaster } from "../App";

export function createToast(message: string, intent: Intent, duration = 3000 ) {
  AppToaster.show({
    message: message,
    intent: intent,
    timeout: duration
  })
}