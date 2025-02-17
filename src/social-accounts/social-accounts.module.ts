import { Module } from '@nestjs/common';
import { SocialAccountsController } from './social-accounts.controller';
import { SocialAccountsService } from './providers/providers/social-accounts.service';
import { UsersService } from 'src/users/providers/users.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [SocialAccountsController],
  providers: [SocialAccountsService],
  imports: [UsersModule],
})
export class SocialAccountsModule {}
