import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
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
      // load:[appConfig,databaseConfig]
      // validationSchema:environmentValidation
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'postgres',
          autoLoadEntities: true,
          synchronize: true,
          port: parseInt(configService.get('DATABASE_PORT')),
          username: configService.get('DATABASE_USERNAME'),
          password: configService.get('DATABASE_PASSWORD'),
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
    OrderProductModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
