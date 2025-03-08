import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { map, Observable, tap } from 'rxjs';
import appConfig from 'src/config/app.config';

@Injectable()
export class DataResponseInterceptor implements NestInterceptor {
  constructor(
    /**inject config service */
    @Inject(appConfig.KEY)
    private readonly configService: ConfigType<typeof appConfig>,
  ) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        return {
          apiVersion: this.configService.apiVersion,
          data,
        };
      }),
    );
  }
}
