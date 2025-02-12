import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { FacebookService } from './providers/facebook.service';

@Module({
  controllers: [AuthController],
  providers: [FacebookService]
})
export class AuthModule {}
