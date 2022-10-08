import { Module } from '@nestjs/common';

import { ConfigurableModuleClass } from '../utils';

import { OneSignalService } from './onesignal.service';

@Module({
  providers: [OneSignalService],
  exports: [OneSignalService],
})
export class OneSignalModule extends ConfigurableModuleClass {}
