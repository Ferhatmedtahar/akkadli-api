import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaginationModule } from 'src/common/pagination/pagination.module';
import { UsersModule } from 'src/users/users.module';
import { DeliveriesController } from './deliveries.controller';
import { Delivery } from './delivery.entity';
import { CreateDeliveryProvider } from './providers/create-delivery.provider';
import { DeleteDeliveryProvider } from './providers/delete-delivery.provider';
import { DeliveryService } from './providers/delivery.service';
import { GetDeliveryProvider } from './providers/get-delivery.provider';
import { UpdateDeliveryProvider } from './providers/update-delivery.provider';

@Module({
  controllers: [DeliveriesController],
  providers: [
    DeliveryService,
    CreateDeliveryProvider,
    GetDeliveryProvider,
    UpdateDeliveryProvider,
    DeleteDeliveryProvider,
  ],
  imports: [
    TypeOrmModule.forFeature([Delivery]),
    UsersModule,
    PaginationModule,
  ],
})
export class DeliveriesModule {}
