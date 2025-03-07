import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { UsersService } from './providers/users.service';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { GetGoogleUserProvider } from './providers/get-google-user.provider';
import { CreateGoogleUserProvider } from './providers/create-google-user.provider';
import { UpdateGoogleUserProvider } from './providers/update-google-user.provider';
import { DeleteGoogleUserProvider } from './providers/delete-google-user.provider';

@Module({
  controllers: [UsersController],
  providers: [UsersService, GetGoogleUserProvider, CreateGoogleUserProvider, UpdateGoogleUserProvider, DeleteGoogleUserProvider],
  exports: [UsersService],
  imports: [
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([User]),
    /**injecting jwt config */
    // ConfigModule.forFeature(jwtConfig),
    // JwtModule.registerAsync(jwtConfig.asProvider()),
  ],
})
export class UsersModule {}
