import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  name: process.env.DATABASE_NAME || 'akkadli',
  username: process.env.DATABASE_USERNAME || 'postgres',
  password: process.env.DATABASE_PASSWORD || 'postgres',
  host: process.env.DATABASE_HOST || 'localhost',
  port: parseInt(process.env.DATABASE_PORT) || 5432,
  autoLoadEntities: process.env.DATABASE_AUTOLOAD_ENTITIES == 'true',
  synchronize: process.env.DATABASE_SYNCHRONIZE == 'true',
}));
