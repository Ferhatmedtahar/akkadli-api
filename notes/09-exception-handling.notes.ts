/*
!---video 1---
$Exception handling:
first WE CAN USE 
it is a way to handle errors in our application
- we are getting default error internal server error 500 
so we need to have proper error handling in place

- so first we defined the req res life cycle
req -->middleware -->START_FILTER --> guard -->interceptorBefore-->Pipe -->controller
-->interceptorAfter-->END_FILTER-->res


- so if any error occur in the : guard , interceptor , pipe or controller , interceptor

- nestjs come will alot built in Http exception filters
like : BadRequestException , GoneException , UnprocessableEntityException,NotFoundException
  
- here is more :https://docs.nestjs.com/exception-filters

- now our controllers are routing only and services dont handle any kind of errors


!---video 2,3---

- check the docs and now we need to indentify points of failure

- what peice of business logic can fail?

- 1 interaction with database , repository
- 2 model contraints : like unique email , required fields , max min length , match pattern.
- 3 querying external apis  
- 4 validation in the dto


!---video 4---
// REVIEW  REMEMBER:
we can handle error anywhere not just in services :
code to do in services:
£ we can save the details error in log fail and send the client the minimal info

try catch blocks
we need to count for request timeout 
    let existingUser = null;
    try {
      existingUser = await this.userRepository.findOne({
        where: { email: createUserDto.email },
      });
    } catch (error) {
      throw new RequestTimeoutException();
    }
if we cant connect to db we will throw error , timeout


so we handle on the create method and send : message, status , error , details if needed
 timeout expeption if unable to connect to db,
 bad request if the body violet contraints


now creating custom exceptions
- we can create a class that extends the http exception
just example :

we have this method and we want to say that we  find  all users has been moved permanently
and all users should get:

throw new HttpException({response firlds}, status code,{error object for you like logs})
---
statusCode: HttpStatus.MOVED_PERMANENTLY,
import {  HttpException,
  HttpStatus,
  NotFoundException,
  RequestTimeoutException,
} from '@nestjs/common';



*/
