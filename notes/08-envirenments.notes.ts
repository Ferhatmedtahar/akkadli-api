/*
- reading the env
- its important to hide our secrets from the public
- we use node process.env to access them
- dotEnv is a package that loads env vars from a .env file
- nest js uses dotenv to load env vars
- it give alot functionallity built in it using the new Config 

- we might have diffrent envs like dev , test , prod
.env ,.env.development , .env.test
- diffrent databases and diffrent configs like auto sync ..ect

$ npm i @nestjs/config 

import and add it to the module imports 

```
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
```

than create on the root dic .env file and add the env vars to it


!how to use it 

$example how to use
```
import { ConfigService } from '@nestjs/config';
constructor(private readonly configService: ConfigService) {}
public getPort() {
 const port = this.configService.get('PORT');
 console.log(port);
 return port;
}
  ```

  //BUG
  with one port only it worked but with 2 or 3 it stuck i dont know why !!
-----------------------------------------------
!NODE_ENV changes on diffrent envs
-  on test/jest-e2e.json and jest in the package.json:
"rootDir": "../",
"modulePaths":["<rootDir>"],

  $  "start:dev": "set NODE_ENV=development && nest start --watch",

- we have to have diffrent env for each NODE_ENV value 
so we need to conditionally load the env vars
 here we added this to the module imports of the app module , 
   ConfigModule.forRoot({
      isGlobal: true,
  $    envFilePath: !ENV ? '.env' : `.env.${ENV}`,
      // envFilePath: ['.env.development', '.env.test', '.env'],
    }),
 
    here we are conditionally loading the env vars
    const ENV = process.env.NODE_ENV;
    //REVIEW
    //REVIEW
    //REVIEW

-----------------------------------------------
the problem of so many env is resolved its working now 
we added .env.development in it and now its not good to access it directly!
now everything should be passed the config service 
DB_TYPE="postgres"
DB_PORT=5432
DB_USERNAME="postgres"
DB_PASSWORD="FERHATSAKI"
DB_HOST="localhost"
DB_DATABASE="nest-blog"


we added 
    TypeOrmModule.forRootAsync({
    $  imports: [ConfigModule],
    $ inject: [ConfigService],
    $  useFactory: (configService: ConfigService) => {
        return {
          type: 'postgres',
          autoLoadEntities: true,
          // entities: [User, Post],
          synchronize: true,
    $      port: +configService.get('DB_PORT'),
    $     username: configService.get('DB_USERNAME'),
    $    password: configService.get('DB_PASSWORD'),
    $   host: configService.get('DB_HOST'),
    $  database: configService.get('DB_DATABASE'),
        };
      },
    }),


!Custom config file

we create a config folder inside the src folder with file app.config.js .ts:

factory function that return an object
export const appConfig = () => {
  return {
    environment: {},
    database: {      host: process.env.DATABASE_HOST || 'localhost',
      port: parseInt(process.env.DATABASE_PORT) || 5432,
      username: process.env.DATABASE_USERNAME || 'postgres',
      password: process.env.DATABASE_PASSWORD || 'FERHATSAKI',
      database: process.env.DATABASE_DATABASE || 'nest-blog',
      },
  }
};


its like another layer of env vars
we dont use env directly we use the config service to access them
and we can set a default values

also there are this values
     autoLoadEntities: true,
          synchronize: true,
which we dont want them in the production and only on the development
 DATABASE_AUTOLOAD="true" in env and read and provide directly everything you need to the app


 //REVIEW now we want to use it in the app module 
     ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: !ENV ? '.env' : `.env.${ENV}`,
      load: [appConfig],
      // envFilePath: ['.env.development', '.env.test', '.env'],
    })
so we added this load property to load 



-----summary :------
we install  the config from nest and add it to the app module 
in imports we filled this 
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: !ENV ? '.env' : `.env.${ENV}`,
      load: [appConfig],
    }), 

created factory function that return object:export appConfig=(){{d...ect}}

    than added config on the root dic .env file and add the env vars to it
    and import and inject the config service on typeorm module
      TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'postgres',
          autoLoadEntities:
            configService.get('database.autoLoadEntities') == 'true'
              ? true
              : false,
          synchronize:
            configService.get('database.synchronize') == 'true' ? true : false,

          port: +configService.get('database.port'),
          username: configService.get('database.username'),
          password: configService.get('database.password'),
          host: configService.get('database.host'),
          database: configService.get('database.database'),
        };
      },
    }),



    -----
    each one is a layer of env vars and export a function registerAs that return it 
    create namespaces for the env vars

    export default registerAs('database', () => ({
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT) || 5432,
    }));


    ---------------------------
    //REVIEW
    partial registerion , module configartion

    imagine like we have a env varialbe of google api key that get the users profile 
    but we dont want to expose it to other modules
    we can do it 

    1- create directory inside the the users for example 
    2- create file profile.config.ts and export default registerAs('profile', () => ({
      apiKey: process.env.PROFILE_API_KEY,
    }))
    3- import and add it to the module imports :
    ``` imports: [ConfigModule.forFeature(profileConfig)],```

    and if we want to use we inject it on the service 
    like this and get type safety 
    ```
    @Inject(profileConfig.KEY)
    private readonly profileConfiguation: ConfigType<typeof profileConfig>,
    ```   


    we need to validate the env vars
    we will use joi
     $npm i joi
    
    - create environment.validation.ts , for ALL envs

import * as joi from 'joi';
export default joi.object({
  NODE_ENV: joi
    .string()
    .valid(['development', 'test', 'production'])
    .default('development'),
  DATABASE_PORT: joi.number().port().default(5432),
  DATABASE_PASSWORD: joi.string().required(),
  DATABASE_DATABASE: joi.string().required(),
  DATABASE_USERNAME: joi.string().required(),
  DATABASE_HOST: joi.string().required().default('localhost'),
  DATABASE_SYNC: joi.string().valid(['true', 'false']).required(),
  DATABASE_AUTOLOAD: joi.string().valid(['true', 'false']).required(),
  PROFILE_API_KEY: joi.string().required(),
});


nest js now need to be aware about the existing of the validation schema exists

  import environmentValidation from './config/environment.validation';
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: !ENV ? '.env' : `.env.${ENV}`,
      load: [appConfig, databaseConfig],
      validationSchema: environmentValidation,
    }),


//TODO
//TODO
    *summary :1-
    $ npm i @nestjs/config 
     $  "start:dev": "set NODE_ENV=development&& nest start --watch",

* 2-   we need to add in app module  imports array 
     ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: !ENV ? '.env' : `.env.${ENV}`,
      load: [appConfig, databaseConfig],
      validationSchema: environmentValidation,
    }),
    
3- then create a config folder and inside 3 folders:
app.config.ts
database.config.ts
environment.validation.ts

$first :
import { registerAs } from '@nestjs/config';
export default registerAs('app', () => ({
  environment: process.env.NODE_ENV || 'production',
}));

$second :
import { registerAs } from '@nestjs/config';
export default registerAs('database', () => ({
  host: process.env.DATABASE_HOST || 'localhost',
  port: parseInt(process.env.DATABASE_PORT) || 5432,
  username: process.env.DATABASE_USERNAME || 'postgres',
  password: process.env.DATABASE_PASSWORD || 'FERHATSAKI',
  database: process.env.DATABASE_DATABASE || 'nest-blog',
  synchonize: process.env.DATABASE_SYNC == 'true' ? true : false,
  autoLoadEntities: process.env.DATABASE_AUTOLOAD == 'true' ? true : false,
}));

$third Is a validation schema FOR ALL envs IN THE APP
import * as joi from 'joi';
export default joi.object({
  NODE_ENV: joi
    .string()
    .default('development')
    .valid('development', 'test', 'production', 'staging'),
  DATABASE_PORT: joi.number().port().default(5432),
  DATABASE_PASSWORD: joi.string().required(),
  DATABASE_DATABASE: joi.string().required(),
  DATABASE_USERNAME: joi.string().required(),
  DATABASE_HOST: joi.string().required().default('localhost'),
  DATABASE_SYNC: joi.string().valid('true', 'false').required(),
  DATABASE_AUTOLOAD: joi.string().valid('true', 'false').required(),
  PROFILE_API_KEY: joi.string().required(),
});

$  fourth: this is a local config for the profile api key just used by the users module
NOTE : this is a partial registration so we need to import it on the users module
£imports: [  ConfigModule.forFeature(profileConfig),]

file profile.config.ts:
import { registerAs } from '@nestjs/config';
export default registerAs('profile', () => ({
  apiKey: process.env.PROFILE_API_KEY,
}));

$this was all setup and load 
now to use on service on the constructor
    *inject config service 
    private readonly configService: ConfigService,
    * inject the profile config service
    @Inject(profileConfig.KEY)
    private readonly profileConfiguation: ConfigType<typeof profileConfig>, 


    finally the changed files was :
        modified:   nestjs-intro/.env.development
        modified:   nestjs-intro/package-lock.json
        modified:   nestjs-intro/package.json
        modified:   nestjs-intro/src/app.module.ts
        modified:   nestjs-intro/src/config/app.config.ts
        new file:   nestjs-intro/src/config/database.config.ts
        new file:   nestjs-intro/src/config/environment.validation.ts
        new file:   nestjs-intro/src/users/config/profile.config.ts
        modified:   nestjs-intro/src/users/providers/users.service.ts
        modified:   nestjs-intro/src/users/users.module.ts
*/
