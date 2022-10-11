import { OneSignalClient } from './onesignal.interface';
import { OPTIONS_TYPE } from './onesignal.module-definition';

import * as OneSignal from 'onesignal-node';

export function createOneSignalClient(
  options: typeof OPTIONS_TYPE,
): OneSignalClient {
  return new OneSignal.Client(options.appId, options.apiKey);
}
