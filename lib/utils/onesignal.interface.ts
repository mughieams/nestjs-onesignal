import * as OneSignal from 'onesignal-node';

export type OneSignalClient = OneSignal.Client;

export interface OneSignalModuleOptions {
  appId: string;
  apiKey: string;
}
