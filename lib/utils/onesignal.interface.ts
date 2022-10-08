import * as OneSignal from '@onesignal/node-onesignal';

export type OneSignalClient = OneSignal.DefaultApi;

export interface OneSignalModuleOptions {
  userKey: Promise<string> | string;
  appKey: Promise<string> | string;
}
