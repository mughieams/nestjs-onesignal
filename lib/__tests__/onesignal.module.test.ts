import { Test } from '@nestjs/testing';

import { OneSignalModule, OneSignalService } from '../module';

import { OPTIONS_TYPE } from '../utils';

describe('OneSignalModule', () => {
  const { ONESIGNAL_API_KEY, ONESIGNAL_APP_ID, ONESIGNAL_PLAYER_ID } =
    process.env;

  if (!ONESIGNAL_API_KEY)
    throw new Error('No OneSignal app key defined in `.env`!');
  if (!ONESIGNAL_APP_ID)
    throw new Error('No OneSignal app id defined in `.env`!');
  if (!ONESIGNAL_PLAYER_ID)
    throw new Error('No testing player id defined in `.env`!');

  const config: typeof OPTIONS_TYPE = {
    appId: ONESIGNAL_APP_ID,
    apiKey: ONESIGNAL_API_KEY,
  };

  describe('forRoot', () => {
    let onesignalService: OneSignalService;

    beforeEach(async () => {
      const module = await Test.createTestingModule({
        imports: [OneSignalModule.forRoot(config)],
      }).compile();

      onesignalService = module.get(OneSignalService);
    });

    it('should provide client', () => {
      expect(onesignalService).toBeDefined();
    });

    it('should send a test notification to the one signal app id defined in env', async () => {
      const response = await onesignalService.client.createNotification({
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

    beforeEach(async () => {
      const module = await Test.createTestingModule({
        imports: [
          OneSignalModule.forRootAsync({
            useFactory: () => config,
          }),
        ],
      }).compile();

      onesignalService = module.get(OneSignalService);
    });

    it('should provide client', () => {
      expect(onesignalService).toBeDefined();
    });

    it('should send a test notification to the one signal app id defined in env', async () => {
      const response = await onesignalService.client.createNotification({
        contents: {
          en: 'Automated testing of https://www.github.com/mughieams/nestjs-onesignal forRootAsync with useFactory',
        },
        include_player_ids: [ONESIGNAL_PLAYER_ID],
      });

      expect(response).toBeDefined();
    });
  });
});
