import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { DeliveriesController } from './deliveries.controller';
import { Delivery } from './delivery.entity';
import { DeliveryService } from './providers/delivery.service';

@Module({
  controllers: [DeliveriesController],
  providers: [DeliveryService],
  imports: [TypeOrmModule.forFeature([Delivery]), UsersModule],
})
export class DeliveriesModule {}
