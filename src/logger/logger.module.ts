import { Global, Module } from '@nestjs/common';
import { FileLoggerService } from './providers/logger.provider';

@Global()
@Module({
  providers: [
    {
      provide: 'ILogger',
      useClass: FileLoggerService,
    },
    FileLoggerService,
  ],
  exports: ['ILogger', FileLoggerService],
})
export class LoggerModule {}
