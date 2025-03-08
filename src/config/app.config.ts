import { registerAs } from '@nestjs/config';

export default registerAs('appConfig', () => {
  return {
    env: process.env.NODE_ENV || 'production',
    port: process.env.PORT || 3000,
    apiVersion: process.env.API_VERSION || '1.0.0',
    mailhost: process.env.MAIL_HOST,
    mailport: process.env.MAIL_PORT,
    smtpuser: process.env.SMTP_USERNAME,
    smtppassword: process.env.SMTP_PASSWORD,
  };
});
