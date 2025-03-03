import { registerAs } from '@nestjs/config';

export default registerAs('profile', () => ({
  apiKey: process.env.PROFILE_API_KEY,
}));
