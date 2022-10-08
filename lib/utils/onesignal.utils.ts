import { OneSignalClient } from './onesignal.interface';
import { OPTIONS_TYPE } from './onesignal.module-definition';

import * as OneSignal from '@onesignal/node-onesignal';

export function createOneSignalClient(
  options: typeof OPTIONS_TYPE,
): OneSignalClient {
  const app_key_provider = {
    getToken() {
      return options.appKey;
    },
  };

  const user_key_provider = {
    getToken() {
      return options.userKey;
    },
  };

  const configuration = OneSignal.createConfiguration({
    authMethods: {
      app_key: { tokenProvider: app_key_provider },
      user_key: { tokenProvider: user_key_provider },
    },
  });

  return new OneSignal.DefaultApi(configuration);
}
