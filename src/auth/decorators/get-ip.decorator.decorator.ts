import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetIp = createParamDecorator((field, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const ip = request.ip;
  return ip;
});
