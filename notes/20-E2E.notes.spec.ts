/*
End to end testing:

if we run unit testing we need to test each method in isolation
end to end testing is a test that we must right

!----video 1---
like post , get , update , delete
we need to test the whole flow : users.post.e2e-spec.ts 
we will interact with the database directly

- so we will use env.test and thats all
- so we are testing the api endpoints , not each method in provider
- we need to use supertest to test the api endpoints
- jest for expectations and run tests , supertest create the server and send the request

- test Data :fakerjs , to generate fake data

- on the test folder we create the entity name along with the tests of each method

!----video 2---

before to start e2e test we need to create a new database and config the .env.test

1- open bgadmin and create a new database
2- env.test and copy the config from env.development
change: DATABASE_DATABASE="nest-blog-test"

3- navigate to main.ts

4- created new function AppCreate that are responsible to add req middlewares
like globalpipe , swagger , s3 ..ect

5- create users folder inside the test and create the users.post.e2e-spec.ts

6- copy the content of the default boilerplate and start working

7- here we are testing the entire app

  afterEach(async () => {
    await app.close();
  }); 
  important after each test we need to close the app that it clean up

  todo://TODO here
   it.todo('/users - Endpoint in public');
  it.todo('/users - firstName is mandatory');
  it.todo('/users - lastName is mandatory');
  it.todo('/users - email is mandatory');
  it.todo('/users - Valid request successfuly create user');
  it.todo('/users - password is not returned in response');
  it.todo('/users - googleId is not returned in response');
  
$ npm run test:e2e --users.post


- inject the Config service 
- add the middlewares
- dropping the table in the database , after each test:
 using method that create connection using the config and initialize , dropDatabase ,destroy the connection



now we need tofinish todos

!----video 6---
created BootstrapNestApp helper which bootstrap the app and return the app

to do in all tests


!----video 7--- http server we get it from app and on each 
! todo we remove "do" and pass function that use supertest
  it('/users - Endpoint is public', () => {
    return request(httpServer)
      .post('/users')
      .send({})
      .expect(400)
      .then(({ body }) => {
        console.log(body);
      });
  });
  
  !----video 8---now we are not sending any body in the request

  INTRO TO fakerjs:
  faker is a library that generates fake data
  fakerjs is a package that generates fake data

  $ npm i @faker-js/faker --save-dev


we test on E2E test ,the response 

we test diff requests and get diff reponses we expect the responses




!FINISHED

import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { BootstrapNestApp } from 'test/helpers/bootstrap-nest-app.helper';
import { dropDatabase } from 'test/helpers/drop-database.helper';
import {
  CompleteUser,
  MissingEmailUser,
  MissingFirstNameUser,
  MissingPasswordUser,
} from './users.post.e2e-spec.sample-data';

describe('[Users]@Post endpoints', () => {
  let app: INestApplication;
  let config: ConfigService;
  let httpServer: App;
  beforeEach(async () => {
    app = await BootstrapNestApp();
    config = app.get<ConfigService>(ConfigService);
    httpServer = app.getHttpServer();
  });

  afterEach(async () => {
    await dropDatabase(config);
    await app.close();
  });

  it('/users - Endpoint is public', () => {
    console.log(CompleteUser);
    return request(httpServer).post('/users').send({}).expect(400);
  });

  it('/users - firstName is mandatory', () => {
    return request(httpServer)
      .post('/users')
      .send(MissingFirstNameUser)
      .expect(400);
  });

  it('/users - email is mandatory', () => {
    return request(httpServer)
      .post('/users')
      .send(MissingEmailUser)
      .expect(400);
  });

  it('/users - password is mandatory', () => {
    return request(httpServer)
      .post('/users')
      .send(MissingPasswordUser)
      .expect(400);
  });

  it('/users - Valid request successfuly create user', () => {
    return request(httpServer).post('/users').send(CompleteUser).expect(201);
  });

  it.todo('/users - password is not returned in response');
  it('/users - password is not returned in response', () => {
    return request(httpServer)
      .post('/users')
      .send(CompleteUser)
      .expect(201)
      .expect((res) => {
        expect(res.body).toBeInstanceOf(Array); // Check if response is an array
        expect(res.body.length).toBeGreaterThan(0); // Ensure it returns users
        expect(res.body[0].role).toBe('admin'); // Ensure all users are admins
      });
  });
  it.todo('/users - googleId is not returned in response');
});


very good example


*/
