// src/logger/file-logger.service.ts
import { Injectable, LoggerService } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { ILogger } from '../interfaces/logger.interface';

@Injectable()
export class FileLoggerService implements ILogger, LoggerService {
  private readonly logFilePath = path.join(process.cwd(), 'logs', 'app.log');

  log(message: string, context?: string, metadata?: Record<string, any>) {
    this.writeLog('LOG', message, context, metadata);
  }

  error(
    message: string,
    trace: string,
    context?: string,
    metadata?: Record<string, any>,
  ) {
    this.writeLog('ERROR', message, context, metadata, trace);
  }

  warn(message: string, context?: string, metadata?: Record<string, any>) {
    this.writeLog('WARN', message, context, metadata);
  }

  debug(message: string, context?: string, metadata?: Record<string, any>) {
    this.writeLog('DEBUG', message, context, metadata);
  }

  verbose(message: string, context?: string, metadata?: Record<string, any>) {
    this.writeLog('VERBOSE', message, context, metadata);
  }

  private writeLog(
    level: string,
    message: string,
    context?: string,
    metadata?: Record<string, any>,
    trace?: string,
  ) {
    const timestamp = new Date().toISOString();
    const logMessage = `${timestamp} [${level}] ${context ? `[${context}] ` : ''}${message}${
      metadata ? ` ${JSON.stringify(metadata)}` : ''
    }${trace ? `\n${trace}` : ''}\n`;

    // Ensure the logs directory exists
    const logDir = path.dirname(this.logFilePath);
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }

    // Append to the log file
    fs.appendFile(this.logFilePath, logMessage, (err) => {
      if (err) {
        console.error(`Failed to write to log file: ${err.message}`);
      }
    });

    // Also log to console for development
    console.log(logMessage);
  }
}
