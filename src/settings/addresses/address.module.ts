import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { AddressController } from './address.controller';
import { Address } from './address.entity';
import { AddressService } from './providers/address.service';
import { CreateAddressProvider } from './providers/create-address.provider';
import { PatchAddressProvider } from './providers/patch-address.provider';
import { GetAddressProvider } from './providers/get-address.provider';

@Module({
  controllers: [AddressController],
  providers: [AddressService, CreateAddressProvider, PatchAddressProvider, GetAddressProvider],
  imports: [TypeOrmModule.forFeature([Address]), UsersModule],
})
export class AddressModule {}
