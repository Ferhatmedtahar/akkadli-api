/*
- Transactions is one complete set of CRUD operation on database
this database operations are interrelated to each other , if one fails the whole transaction fails

- this need an accurate results

- we need to be able to roolback to the starting point if one fails

- typeorm allow us to do transactions 

- so we get from it performing multiple operations in one database connection
- auto roolback and assured Data 

*Query runner
- the query runner is a class that is return single connection from a pool of connections available
- most of db have connection pool
- a connection pool is number of consucutive connections that we can have in database
- this connection is used to perform multiple operations on the database by one connection to do transaction

- connect to the data source and start () a transaction 
- we will have defined CRUD op and than we commit the transaction 
- if success we commit the transaction else we rollback the transaction 
- release ()the connection

!---video 3---
transaction :example 
creating many users at ones 

  ! method that create multiple users
  public async createManyUsers(createUsersDto: CreateUserDto[]) {}
//REview  this CreateUserDto[] is an array of CreateUserDto but its doesnt validate the nested objects
it just give type safety

!--video 4---
diffrence between transaction and normal crud operations

- why we dont use transaction everywhere for every insertion
- we dont need it because transactions are not doing insertions or updating , or deletings !

- we use it only when we have multiple insertions on the database


!--video 5---

now we have big service file where we have multiple methods and bussiness logic 

so we need to divide it 

$ nest g pr users/providers/users-create-many.provider  --flat --no-spec

- copy and paste the method and add the imports
- add injections if needed

- check if added in the provider  

- call it on the main service by adding it 
- adding http endpoints file

-  createUsersDto: CreateUserDto[] this wont validate the nested objects just give type safety
so WE NEED TO UPDATE THE DTO

validateNested({ each: true })
Type(() => CreateUserDto)
this two will validate the nested objects and turn it into CreateUserDto


added exception filter to handle errors
ConflictException if we cant commit transaction,
RequestTimeoutException if we cant connect to db or start transaction or realize connection
*/
