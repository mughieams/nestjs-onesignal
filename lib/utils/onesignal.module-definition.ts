import { ConfigurableModuleBuilder } from '@nestjs/common';

import type { OneSignalModuleOptions } from './onesignal.interface';

export const {
  ConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN,
  OPTIONS_TYPE,
  ASYNC_OPTIONS_TYPE,
} = new ConfigurableModuleBuilder<OneSignalModuleOptions>()
  .setClassMethodName('forRoot')
  .build();
