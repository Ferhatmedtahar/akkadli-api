/*
!Chapter 3 : Providers
- think about providers as additional classes that help us add business logic to the module
- controller only should handle routing logic 
- controller talk to service and service talk to database and other providers
- provider can be a service or a repository or factory ..ect


*pipe:
req res life cycle:
  req hit first a middleware and than filters [boundary:responsible for throwing exceptions]
  than Guards , interceptors , pipes , controllers ,interceptors , filter end , res
  pipes are used to transform and validate data before sending it to the controller
  to make sure we have the structure we need

  there is built in pipes like ParseIntPipe : we trasform and validate the params and query 
   there is small problem with this that pipes assume that they are required
   so if we try to transform and validate optional params or query , it wont work as expected
    !new DefaultValuePipe() for the query bcs it is optional and we want to give it default value
    !however we can't give a param a default value since its requisted
    
    its hard to revalidate the body using the exising pipes
    so we use custom pipes :
    *DTO  :data transfer object  
    to validate the body 

    $`npm i class-validator , npm i class-transformer`
    we crate directory of dtos
    and file that export class createUserDto and there we do validation on the body and we use it on the type 

so we validated the body but having it on all endponts is not a good idea --repetitive code
we can do global validation :
£ app.useGlobalPipes(new ValidationPipe(whitelist: true,  forbidNonWhitelisted: true ,transform : true);
only the properties that are in the dto will be validated and carried to the controller
forbid non whitelisted will throw an error if the body contains properties that are not in the dto
$ do it on the main.ts and dont use on @Body() dtoName :DtoName

however if we add a property to the body that is not in the dto we will not get an error and pass to controller
so we added this args to the validation pipe :{whitelist: true,  forbidNonWhitelisted: true}
and for better type safety : transform : true
this will transform the body to be intance of the dto for better type safety 


for now we validate and transform the body , query ,using custom pipes or built in pipes
there are one issue left which is the params 

add custom dto called getUserParamDto and use it on the param decorator
also bcs the url is string we need to transform it to number using class transformer

  @Type(() => Number)


 £Mapped DTOs:
to organize the dto in better way
$ npm i @nestjs/mapped-types@2.0.5
this take all the logic on the createUserDto and put it on the patchUserDto making all 
the properties optional
import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './createUser.dto';

export class PatchUserDto extends PartialType(CreateUserDto) {}

validations functions 

import {
  IsArray,
  IsEnum,
  IsISO8601,
  IsJSON,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { PostType } from '../enums/postType.enum';
import { status } from '../enums/status.enum';
import { CreatePostMetaDataDto } from './createPostMetaOption.dto';
import { Type } from 'class-transformer';

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePostMetaDataDto)
  metaOptions: CreatePostMetaDataDto[];
*/
