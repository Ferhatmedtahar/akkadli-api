import * as joi from 'joi';

export default joi.object({
  NODE_ENV: joi
    .string()
    .valid('development', 'test', 'production', 'staging')
    .default('development')
    .trim(),

  DATABASE_NAME: joi.string().required(),

  DATABASE_PORT: joi.number().port().default(5432),

  DATABASE_PASSWORD: joi.string().required(),

  DATABASE_USERNAME: joi.string().required(),

  DATABASE_HOST: joi.string().default('localhost'),

  DATABASE_SYNCHONIZE: joi.string().valid('true', 'false').required(),

  DATABASE_AUTOLOAD_ENTITIES: joi.string().valid('true', 'false').required(),

  PROFILE_API_KEY: joi.string().required(),
});
