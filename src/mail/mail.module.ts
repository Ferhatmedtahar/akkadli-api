import { Global, Module } from '@nestjs/common';

import { MailerModule } from '@nestjs-modules/mailer';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import { MailService } from './providers/mail.service';
@Global()
@Module({
  imports: [
    MailerModule.forRootAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => {
        return {
          transport: {
            host: config.get('appConfig.mailhost'),
            secure: false,
            port: config.get('appConfig.mailport'),
            auth: {
              user: config.get('appConfig.smtpuser'),
              pass: config.get('appConfig.smtppassword'),
            },
          },
          defaults: {
            from: `Akkadli <no-reply@akkadli.com>`,
          },
          template: {
            dir: join(__dirname, 'templates'),
            adapter: new EjsAdapter({ inlineCssEnabled: true }),
            options: {
              strict: false,
            },
          },
        };
      },
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
