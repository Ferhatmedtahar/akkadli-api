/*
Guards:
the guards job is to prove or disprove the request
- we can create an access token guard to decide the request should be processed or not
- it will throw UnauthorizedException if the token is invalid
- how to use them :
guards can be used on the controller level or on the method level : 91.png
 its like a custom Decorator, we use before the method or the controller class to add behavior

@UseGuards()
it can be also applied to the entire apps or just module


!------video 2-------
create access token guard
the job is to extract the token from the request and check if it is valid

I tried :
$ nest g gu auth/guards/auth --flat --no-spec

every guard should implement the CanActivate interface
the default guard:

import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return true;
  }
}



!------video 3-------
- we can inject services inside of guards
- we can also inject other guards inside of guards
```
export class AccessTokenGuard implements CanActivate {
  constructor(
    /**inject jwt service 
    private readonly jwtService: JwtService,
    /**inject jwt config 
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}.....rest of code}
```

- we create a private method for each step like extract the request , token.ect

- we need some config , like the secret key and services so we do DI


!------video 4-------

- if we dont find token or something that is invalid 
if the token is valid we need to attach the user to the request 
 request['user'] = payload;
instead of using "user" bcs we need it in multipe places
request[REQUEST_USER_KEY] = payload;


now we will use it on 
$ just make sure the config and service are injected 
£on the method of the controller
1- we wanted to apply the guard on one specific method :createManyUsers
  @UseGuards(AccessTokenGuard)

to try we send req to authenticate the user and get the token
 send it along with the request
 Authorization:Bearer eyJhbGciOiJIUzI1Ni...

£ on entire method 
it work by adding a object on the providers array on the module
    {provide:APP_GUARD, useClass:AccessTokenGuard},
bcs we set the entire app to use the guard
    !THIS WILL GUARD THE ENTIRE APP

!------video 6,7 practice , 8 Decorators-------
nest js decorators are nothing but typescript decorators 
they have a specific purpose to solve 
the purpose is the metadata
its a way to attach metadata to code and describe other data , content , shape
... data about the data
its a way to manage the data and udnerstand it

- decorators will inform nest how to deal and when and where , its declarative approach
- metadata are informing the excution context 

- without the decorators, nestjs will not be able to identify methods

!- nest js use Reflection to check the metadata and use it 

- we can custom decorators to create our own metadata

- to access the metadata that we set on a class , method , parameter or property of method
we use Reflactor.

we can use Relactor on guards ,Interceptors, Pipes, middleware

!------video 9-------
making a custom decorator to have public route

  @SetMetadata('isPublic', true) on the controller method that need it 
  $ nest g d auth/decorators/auth --flat --no-spec
- we have two types of auth :AUTH_TYPE_KEY : authType , and two values: Bearer and None
None means that the request does not need authentication
Bearer means that the request needs authentication

-- so we created a decorator that setMetaData of authType to Bearer, None

-- now we will create a guard that will check the authType
AuthenticationGuard : take commulative decisions based on metaData that are assigned
to the route and decide if its public or not

-- we will use Access Token gard as part  and replace it from the app guard 
and place it only on the imports array

!------video 11-------
start implementing:
we need to get the metadata from the decorator , so we need the reflactor class

import the guard :subguard now
- set a global auth strategy : all private only 

1️⃣ Why Use []?
When defining an object, keys are usually strings by default:

typescript
Copy
Edit
const myObject = {
  key: "value",
};
However, if you want to dynamically set a key using a variable or an enum, you must use computed property syntax with square brackets ([]):

typescript
Copy
Edit
const dynamicKey = "Bearer";

const myObject = {
  [dynamicKey]: "value",
};

console.log(myObject); // { Bearer: 'value' }


----------------------------------------
so here

```
      const authTypes = this.reflector.getAllAndOverride(AUTH_TYPE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
```

- here we get the metadata of AUTH_TYPE_KEY from the handler and the class 
name , location

- this will get us the metadata of the handler and the class that have the metadata:
AUTH_TYPE_KEY

- if there is no authtype we pass the default 

finished 

!------video 13, 14 -------
now we will see the usage of the user payload we just added to the req

- to create relations with the post for example and user 
- the user dont need to pass his id bcs we will get it from the payload

  public createPosts(@Body() createPostDto: CreatePostDto, @Req() request) {
    return request[REQUEST_USER_KEY];
    return this.postsService.create(createPostDto);
  }

  this is very bad , we need always to get the user from the request
  this also will make testing difficult
  so we can create a userActive decorator 

  we have two types of decorator we can create: 
decorator of a controller , method : this can be done by //$nest g d path --flat --no-spec
  decorator of a parameter of a method://!https://docs.nestjs.com/custom-decorators

  - there are just a function the controller and method use SetMetadata("constant",enum)


  this param decorator ,if it take a field when used will return the value of that field
  if not return the entire payload and place it in the next value of the decorator

  @ActiveUser(ActiveUserData.email)email:string
we use it on the method of controller and service

  import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ActiveUserData } from '../interfaces/active-user-data.interface';
import { REQUEST_USER_KEY } from '../constants/auth.constant';

export const ActiveUser = createParamDecorator(
  (field: keyof ActiveUserData | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user[REQUEST_USER_KEY];
    return field ? user?.field  : user;
  },
);


*/
