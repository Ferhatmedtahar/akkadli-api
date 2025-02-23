import { Module } from '@nestjs/common';
import { DeliveriesController } from './deliveries.controller';
import { DeliveryService } from './providers/delivery.service';

@Module({
  controllers: [DeliveriesController],
  providers: [DeliveryService],
})
export class DeliveriesModule {}
