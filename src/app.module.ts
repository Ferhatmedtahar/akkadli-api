import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import appConfig from './config/app.config';
import databaseConfig from './config/database.config';
import environmentValidation from './config/environment.validation';
import { OrderProductModule } from './order_product_managment/order-product/order-product.module';
import { OrdersModule } from './order_product_managment/orders/orders.module';
import { ProductsModule } from './order_product_managment/products/products.module';
import { AddressModule } from './settings/addresses/address.module';
import { DeliveriesModule } from './settings/deliveries/deliveries.module';
import { GeneralSettingsModule } from './settings/general-settings/general_settings.module';
import { SettingsModule } from './settings/settings.module';
import { UsersModule } from './users/users.module';

const ENV = process.env.NODE_ENV.trim();
@Module({
  imports: [
    UsersModule,
    AuthModule,
    ProductsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: !ENV ? '.env' : `.env.${ENV}`,
      load: [appConfig, databaseConfig],
      validationSchema: environmentValidation,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'postgres',
          autoLoadEntities: configService.get('database.autoLoadEntities'),
          synchronize: configService.get('database.synchronize'),
          port: +configService.get('database.port'),
          username: configService.get('database.username'),
          password: configService.get('database.password'),
          host: configService.get('database.host'),
          database: configService.get('database.name'),
        };
      },
    }),
    OrdersModule,
    SettingsModule,
    DeliveriesModule,
    AddressModule,
    GeneralSettingsModule,
    OrderProductModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
