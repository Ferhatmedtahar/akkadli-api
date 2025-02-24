import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressModule } from './addresses/address.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DeliveriesModule } from './deliveries/deliveries.module';
import { OrdersModule } from './orders/orders.module';
import { ProductsModule } from './products/products.module';
import { SettingsModule } from './settings/settings.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    ProductsModule,
    TypeOrmModule.forRootAsync({
      useFactory: () => {
        return {
          type: 'postgres',
          autoLoadEntities: true,
          synchronize: true,
          port: 5432,
          username: 'postgres',
          password: 'FERHATSAKI',
          host: 'localhost',
          database: 'akkadli',
        };
      },
    }),
    OrdersModule,
    SettingsModule,
    DeliveriesModule,
    AddressModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
