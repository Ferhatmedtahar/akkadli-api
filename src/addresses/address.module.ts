import { Module } from '@nestjs/common';
import { AddressController } from './address.controller';
import { AddressService } from './providers/address.service';

@Module({
  controllers: [AddressController],
  providers: [AddressService]
})
export class AddressModule {}
