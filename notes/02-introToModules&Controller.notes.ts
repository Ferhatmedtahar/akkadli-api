/*
 !CHAPTER 2 : understanding modules
- models are like package of a specific functionality that we want to use in our application
- models can talk to each other
- controller are responsible for handling http requests and routing
- imagine we have user module 
--it will contain controller and service and entity and spec for controller

- main.ts is the entry point of our application
- and app.module is the root module of our application and all modules are connected to it 
- we can connect modules using dependency injection 
- we can have alot files in one module  
-----
- very great seperation of concerns
- we create new modules and indetify them to the app by adding them to the imports array
-- we can create modules manually or by doing : nest generate mo users
-- this will get us new folder for this module and update the appmodules to be able to indentify it 
-- understood the rest api anatomy and server client decoupling and multi layer
!- setup httpyuc and app.endpoints.http to send and recieve requests and we can share them
  - controllers :routing
   --handle incoming requests , send responses, handle exceptions
$ --we can create manually or with the command :nest generate controller users
   !--this what make controller a controller : http://localhost:3000/users 
   @Controller('users')//:'users' is the route prefix for this controller
   export class UsersController {}
   and link it to the module who own it 

£---routing decorator 
- we create a public method within the controller class and assign it to a method Decorator
decorator is @ and the name of the method called 

*now how to grab : params , query , body this two are sent on the request  headers , cookies 
- added the param decorator inside the method and inside the method we write its name 
- so the params and query are added into the method argument using the decorator 
samed goes to the body

*WE CAN USE THE REQUEST OBJ GIVEN BY express instead ! only when we want to alter the request

- if we want to only take spesific params or query or body from the request we can use it the param decorator
- this is usefull on the body 
 */
