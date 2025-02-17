import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { SocialAccountsService } from './providers/social-accounts.service';
import { SocialAccountsController } from './social-accounts.controller';

@Module({
  controllers: [SocialAccountsController],
  providers: [SocialAccountsService],
  imports: [UsersModule],
})
export class SocialAccountsModule {}
