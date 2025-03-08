import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { AddressController } from './address.controller';
import { Address } from './address.entity';
import { AddressService } from './providers/address.service';

import { GetAddressProvider } from './providers/get-address.provider';
import { PatchAddressProvider } from './providers/patch-address.provider';

@Module({
  controllers: [AddressController],
  providers: [AddressService, PatchAddressProvider, GetAddressProvider],
  imports: [TypeOrmModule.forFeature([Address]), UsersModule],
  exports: [AddressService],
})
export class AddressModule {}
