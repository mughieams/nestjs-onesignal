import { Test } from '@nestjs/testing';

import { OneSignalModule, OneSignalService } from '../module';

import { OPTIONS_TYPE } from '../utils';

import * as OneSignal from '@onesignal/node-onesignal';

describe('OneSignalModule', () => {
  const {
    ONESIGNAL_APP_KEY,
    ONESIGNAL_USER_KEY,
    ONESIGNAL_APP_ID,
    ONESIGNAL_PLAYER_ID,
  } = process.env;

  if (!ONESIGNAL_APP_KEY)
    throw new Error('No OneSignal app key defined in `.env`!');
  if (!ONESIGNAL_USER_KEY)
    throw new Error('No OneSignal user key defined in `.env`!');
  if (!ONESIGNAL_APP_ID || !ONESIGNAL_PLAYER_ID)
    throw new Error('No testing app id and player id defined in `.env`!');

  const config: typeof OPTIONS_TYPE = {
    appKey: ONESIGNAL_APP_KEY,
    userKey: ONESIGNAL_USER_KEY,
  };

  describe('forRoot', () => {
    let onesignalService: OneSignalService;
    let onesignalApp: OneSignal.App;

    beforeEach(async () => {
      const module = await Test.createTestingModule({
        imports: [OneSignalModule.forRoot(config)],
      }).compile();

      onesignalService = module.get(OneSignalService);
      onesignalApp = await onesignalService.client.getApp(ONESIGNAL_APP_ID);
    });

    it('should provide client', () => {
      expect(onesignalService).toBeDefined();
    });

    it('should send a test notification to the one signal app id defined in env', async () => {
      const response = await onesignalService.client.createNotification({
        app_id: onesignalApp.id,
        contents: {
          en: 'Automated testing of https://www.github.com/mughieams/nestjs-onesignal forRoot',
        },
        include_player_ids: [ONESIGNAL_PLAYER_ID],
      });

      expect(response).toBeDefined();
    });
  });

  describe('forRootAsync with useFactory', () => {
    let onesignalService: OneSignalService;
    let onesignalApp: OneSignal.App;

    beforeEach(async () => {
      const module = await Test.createTestingModule({
        imports: [
          OneSignalModule.forRootAsync({
            useFactory: () => config,
          }),
        ],
      }).compile();

      onesignalService = module.get(OneSignalService);
      onesignalApp = await onesignalService.client.getApp(ONESIGNAL_APP_ID);
    });

    it('should provide client', () => {
      expect(onesignalService).toBeDefined();
    });

    it('should send a test notification to the one signal app id defined in env', async () => {
      const response = await onesignalService.client.createNotification({
        app_id: onesignalApp.id,
        contents: {
          en: 'Automated testing of https://www.github.com/mughieams/nestjs-onesignal forRootAsync with useFactory',
        },
        include_player_ids: [ONESIGNAL_PLAYER_ID],
      });

      expect(response).toBeDefined();
    });
  });
});
