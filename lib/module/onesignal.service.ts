import { Inject, Injectable } from '@nestjs/common';

import {
  createOneSignalClient,
  MODULE_OPTIONS_TOKEN,
  OPTIONS_TYPE,
} from '../utils';

import type { OneSignalClient } from '../utils';

@Injectable()
export class OneSignalService {
  private readonly OneSignalSDK: OneSignalClient;

  constructor(
    @Inject(MODULE_OPTIONS_TOKEN) private options: typeof OPTIONS_TYPE,
  ) {
    this.OneSignalSDK = createOneSignalClient(this.options);
  }

  public get client(): OneSignalClient {
    return this.OneSignalSDK;
  }
}
