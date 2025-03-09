export interface ILogger {
  log(message: string, context?: string, metadata?: Record<string, any>): void;
  error(
    message: string,
    trace: string,
    context?: string,
    metadata?: Record<string, any>,
  ): void;
  warn(message: string, context?: string, metadata?: Record<string, any>): void;
  debug(
    message: string,
    context?: string,
    metadata?: Record<string, any>,
  ): void;
  verbose(
    message: string,
    context?: string,
    metadata?: Record<string, any>,
  ): void;
}
