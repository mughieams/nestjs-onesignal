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
            appKey: process.env.ONESIGNAL_APP_KEY,
            userKey: process.env.ONESIGNAL_USER_KEY,
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
                appKey: configService.get('ONESIGNAL_APP_KEY'),
                userKey: configService.get('ONESIGNAL_USER_KEY'),
            }),
            inject: [ConfigService],
        }),
    ],
})
export class AppModule {}
```

Example usage in service.

```typescript
import { OneSignalService } from 'nestjs-twilio';

@Injectable()
export class AppService {
    public constructor(
        private readonly onesignalService: OneSignalService,
        private readonly configService: ConfigService,
    ) {}
    
    async sendNotification() {
        const appId = this.configService.get(ONESIGNAL_APP_ID);
        const playerId = this.configService.get(ONESIGNAL_APP_ID);
        const onesignalApp = await this.onesignalService.client.getApp(appId);
        
        return await this.onesignalService.client.createNotification({
            app_id: onesignalApp.id,
            contents: {
                en: 'Sent notification to spesific player id',
            },
            include_player_ids: [playerId],
        });
    }
}
```

For full Client Library see One Signal Node SDK reference [here](https://github.com/OneSignal/node-onesignal)