import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { OrdersModule } from './orders/orders.module';
import { SettingsModule } from './settings/settings.module';
import { DeliveriesModule } from './deliveries/deliveries.module';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
