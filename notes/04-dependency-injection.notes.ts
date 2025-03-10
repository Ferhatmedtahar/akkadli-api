/*
steps when we create a module :
before on the main use :  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),

create a module 
 create a controller 
  get the needed params , body , query,..ect
  create http , providers ,dtos  folder
 do on them transform and validate them using DTOs like this
!getUser(@Body() getUserDto : GetUserDto)

we create provider:@Injectable()
export class UsersService { here we do the methods }
and to connect them we add the provider on the contructor of the controller and inject it 
and do also on the module providers array
$ thats all

ITS SO IMPORTANT TO UNDERSTAND DEPENDENCY INJECTION

what is dependency :
dependency is a relationship between two classes: one class depend on another class 
like post and user   
this bcs we might need to check the if user exist in db or not and then assign it.

!architecting app that manage dependencies well is so important!!

creating user class whenever we need it is so bad and wasteful and inefficient and no testable

so we use dependency injection:

so instead of creating a new user whenever we need it we pass it as a 
dependency to the class that need it on the contructor 
so the constructor will take a intance of the user class

!nest generate service ./posts/providers/posts.service.ts --flat --no-spec
--------------------------------------------------------------------
$SO now in dependency injection on nest js work like this 
its the backbone of nest js app and make it modular
dependency graph is created when the app is bootstrapped

- module always encapsulate all the providers , controller ... 
- module is the one who decide to export , provide 
- only when we explicitly mention that  for example user controller to use user service 
- communication between 2 modules are for `export `or `provide`some service` 

###INTRA MODULAR DEPENDENCY INJECTION

there are 3 steps to dependency injection :
1- Declare : create a provider using the @Injectable() decorator
2- connect: add the provider to the providers array in the module  
3- inject: inject the provider into the constructor of the controller 
  
  constructor(private readonly UsersSerivce: UsersService) {}
so we declare services {providers},add to module the imported providers, inject to controller
this means provide this service to all the local component in the module


----
controllers hold only the routing logic
services hold the business logic

so we created inside our services a findOne, findAll methods 

-------------------
TYPES OF DEPENDENCY

#INTRA MODULAR DEPENDENCY 
within the same module we can use dependency injection

#INTER MODULAR DEPENDENCY
here we have 2 modules , user and post , the user module  depends on the post module
one way only 

#CIRCULAR DEPENDENCY
here like we have user and auth module and user depends on auth and auth depends on user



now we want to implement inter modular dependency injection
before we did intra and now we want to see how to do with inter modular using posts and users
so we can get the posts of specific user  

so we export provider :are classes with the @Injectable() decorator

ofc we said that the module is the commander so we need to tell it to export the provider
$ we export the service and import the entire module 

here we do the contructor on the service to be able to inject the user service
  so in inter modular dependency injection : constructor on the service and export  ,import
  constructor(private readonly userService: UsersService) {}

  intra modular dependency injection
  we do constructor on the controller and inject the service  and tell the module 

WE CAN DO dependency injection before starting the logic of the app bcs we know the dependencies  


if we do import , export :
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthServiceTsService } from './providers/auth.service.ts.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [AuthController],
  providers: [AuthServiceTsService],
  exports: [AuthServiceTsService],
  imports: [UsersModule],
})
export class AuthModule {}

we get error : 

import { forwardRef, Inject } from '@nestjs/common';

so we did on the imports array :
forwardRef(() => AuthModule)
and on the services :
    @Inject(forwardRef(() => AuthServiceTsService))
*/

class User {
  constructor() {
    console.log("user");
  }
  public firstName = "test";
}
// this is bad so :
// class Post {
//   constructor(private user = new User()){
//     console.log('post');
//   }
// }
class Post {
  constructor(private user: User) {
    console.log("post");
  }
}

// the bad const post1 = new Post()
const post = new Post(new User());
