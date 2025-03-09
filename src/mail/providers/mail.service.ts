import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from 'src/users/user.entity';

@Injectable()
export class MailService {
  constructor(
    /** inject mailer service */
    private readonly mailerService: MailerService,
  ) {}
  public async sendUserWelcomeEmail(user: User) {
    return await this.mailerService.sendMail({
      from: 'Onboarding Team <akkadli@gmail.com>',
      to: user.email,
      subject: 'Welcome to Akkadli! 🚀',
      template: './welcome',
      context: {
        name: user.firstName,
        email: user.email,
        loginUrl: 'http://localhost:3000',
      },
    });
  }
}
