import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { OrdersModule } from './orders/orders.module';
import { ProductsModule } from './products/products.module';
import { AddressModule } from './settings/addresses/address.module';
import { DeliveriesModule } from './settings/deliveries/deliveries.module';
import { GeneralSettingsModule } from './settings/general-settings/general_settings.module';
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
    GeneralSettingsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
