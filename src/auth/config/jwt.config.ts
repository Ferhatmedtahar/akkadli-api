import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => ({
  secret: process.env.JWT_SECRET,
  accessTokenTTL: parseInt(process.env.JWT_ACCESS_TOKEN_TTL ?? '3600', 10),
  refreshTokenTTL: parseInt(process.env.JWT_REFRESH_TOKEN_TTL ?? '86400', 10),
  tokenIssuer: process.env.JWT_TOKEN_ISSUER,
  tokenAudience: process.env.JWT_TOKEN_AUDIENCE,
}));
