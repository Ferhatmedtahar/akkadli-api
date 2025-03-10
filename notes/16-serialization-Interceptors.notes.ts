/*
Serialization and Interceptors:

- Interceptors are excuted twice : before the pipe, route handler and
 after the controller , route handler

- purpose of interceptors is that we can add:
    - bind extra logic before and after method excution
    - transform the result of the method excution 
    - transform the exception thrown by the method
    - extend the function behavior
    - caching purposes 


- if we have a user that has a password, we dont want to send it to the client even if encrypted 
so we use interceptors for that to transform the response.

- api versions and send :{version:1, data:{}} 

- we can make global interceptors to make one request.

- practice:
when we go to http and send a create a user  we get like this 
{
  "firstName": "ferhat",
  "lastName": "tahar",
  "email": "interceptor@gmail.com",
  "password": "$2b$10$3./3Darw/nL/BU3V8X/YKe29BvDwNsZIfz//wcpE9do9NraEUesAS",
  "googleId": null,
  "id": 15
}

we dont want to send the password , googleId to the client

use interceptors to transform the response

Class SerializerInterceptor to do

so we go to the controller and apply on it decortaor
@UseInterceptors(ClassSerializerInterceptor)

and go to the entity and   @Exclude() to exclude the field

we get this
{
  "firstName": "ferhat",
  "lastName": "tahar",
  "email": "interceptortestexclude@gmail.com",
  "id": 16
}


!---video 3---
now we want to create an interceptor that will transform the response globally

$ nest g interceptor common/interceptors/data-response --no-spec

import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class DataResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle();
  }
}


this boilerplate code expect us to have intercept method

this method have 2 arguments
context : the current execution context of app
next : the next interceptor or the route handler

we call next.handle() to pass {moves}the request to the next interceptor or the route handler

this interceptor will return rxjs Observable<any>:which is elegant way to handle promises

rxjs uses pipe() method to chain observables and tap method to add side effects

to alter the response we use map




dont forget//REVIEW
dont forget//REVIEW
dont forget//REVIEW

after creating the interceptor and fill the logic 
we need to apply globally on the main

app.useGlobalInterceptors(new DataResponseInterceptor());


intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
  console.log('before...');
  
  return next.handle().pipe(
    tap((data) => {
      console.log('after', data);
      }),
      );
      } 
      
      
      this code here will run log before  and then later after and the data
      
      we need to alter all response to have one shape
      
      api versions and send :{version:1, data:{}}
      
      
      
to alter the response we use map and return an object 
make env for api version

we remove this because we dont have access to env  in the main
add Global interceptors
  app.useGlobalInterceptors(new DataResponseInterceptor());

so we apply this on the appModule:

  providers: [
    AppService,
    { provide: APP_GUARD, useClass: AuthenticationGuard },
    { provide: APP_INTERCEPTOR, useClass: DataResponseInterceptor },
    AccessTokenGuard,
  ],

{
  "apiVersion": "0.1.1",
  "data": {
    "firstName": "ferhat",
    "lastName": "tahar",
    "email": "lasttestoninterceptor@gmail.com",
    "id": 18
  }
}
  
  */
