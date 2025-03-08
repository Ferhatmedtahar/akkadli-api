import { INestApplication, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function CreateApp(app: INestApplication): void {
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        // no need to add @Type(()=>Number) on dtos but still
        enableImplicitConversion: true,
      },
    }),
  );
  app.enableCors();
  const config = new DocumentBuilder()
    .setTitle('Akkadli api')
    .setDescription('Use the base API URL as http://localhost:3000/')
    .setVersion('1.0')
    .setTermsOfService('https://example.com/terms')
    .setLicense('MIT', 'https://opensource.org/licenses/MIT')
    .addServer('http://localhost:3000/')
    .build();
  //Instantiate document
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);
}
