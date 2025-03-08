import { NestFactory } from '@nestjs/core';
import { CreateApp } from './app.create';
import { AppModule } from './app.module';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  ///add all middlewares
  CreateApp(app);
  await app.listen(parseInt(process.env.PORT) ?? 3000);
}
bootstrap();
