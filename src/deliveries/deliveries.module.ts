import { Module } from '@nestjs/common';
import { DeliveriesController } from './deliveries.controller';
import { DeliveryService } from './providers/delivery.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Delivery } from './delivery.entity';

@Module({
  controllers: [DeliveriesController],
  providers: [DeliveryService],
  imports: [TypeOrmModule.forFeature([Delivery])],
})
export class DeliveriesModule {}
