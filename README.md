<p align="center">
  <h3 align="center">
    nestjs-onesignal
  </h3>

  <p align="center">
    <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
  </p>

  <p align="center">
    💉 Injectable <a href="https://onesignal.com/">OneSignal</a> client for <a href="https://nestjs.com/">NestJS</a>.
  </p>

  [![codecov](https://codecov.io/gh/mughieams/nestjs-onesignal/branch/main/graph/badge.svg?token=SacfYAwyeP)](https://codecov.io/gh/mughieams/nestjs-onesignal) [![npm version](https://img.shields.io/npm/v/nestjs-onesignal)](https://www.npmjs.com/package/nestjs-onesignal) [![miniziped size](https://badgen.net/bundlephobia/minzip/nestjs-onesignal)](https://bundlephobia.com/result?p=nestjs-onesignal) [![MIT licensed](https://img.shields.io/github/license/mughieams/nestjs-onesignal)](https://raw.githubusercontent.com/mughieams/nestjs-onesignal/main/LICENSE)
</p>

Implementing the `OneSignalModule` from this package you gain access to OneSignal client through dependency injection with minimal setup.

## Instalation

```bash
$ npm install --save @onesignal/node-onesignal nestjs-onesignal
```

```bash
$ yarn add @onesignal/node-onesignal nestjs-onesignal
```

## Getting Started

To use OneSignal client we need to register module for example in app.module.ts

```typescript
import { OneSignalModule } from 'nestjs-onesignal';

@Module({
    imports: [
        OneSignalModule.forRoot({
            appId: process.env.ONESIGNAL_APP_ID,
            apiKey: process.env.ONESIGNAL_API_KEY,
        }),
    ],
})
export class AppModule {}
```

If you are using the `@nestjs/config` package from Nest, you can use the `ConfigModule` using the `registerAsync()` function to inject your environment variables like this in your custom module:

```typescript
import { OneSignalModule } from 'nestjs-onesignal';

@Module({
    imports: [
        OneSignalModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                appId: configService.get('ONESIGNAL_APP_ID'),
                apiKey: configService.get('ONESIGNAL_API_KEY'),
            }),
            inject: [ConfigService],
        }),
    ],
})
export class AppModule {}
```

Example usage in service.

```typescript
import { OneSignalService } from 'nestjs-onesignal';

@Injectable()
export class AppService {
    public constructor(
        private readonly onesignalService: OneSignalService,
        private readonly configService: ConfigService,
    ) {}

    async sendNotification() {
        const playerId = this.configService.get(ONESIGNAL_PLAYER_ID);

        return await this.onesignalService.client.createNotification({
            contents: {
                en: 'Sent notification to spesific player id',
            },
            include_player_ids: [playerId],
        });
    }
}
```

For full Client Library see One Signal Node SDK reference [here](https://github.com/OneSignal/node-onesignal)
