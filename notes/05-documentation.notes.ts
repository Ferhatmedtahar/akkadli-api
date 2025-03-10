/*
  Documentation

- we can document our api endpoints and our code  
- OPEN API known as swagger , documentation for our clients to be able to use and read and try dummy servers
- COMPODOC is for code documentation , what modules , strctures , methods , ..ect


- open api specification is a standard for api documentation
- like tell us how it should be documented and implemented  
- swagger is a tool that follow open api specification and gives us UI and thereare more tools are well


$1- ingegrate swagger:

npm i  @nestjs/swagger

than we go to main.ts and there we configure it:
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
  !swagger config
  const config = new DocumentBuilder().setVersion('1.0').build();
  !Instantiate document
  const document = SwaggerModule.createDocument(app, config);
  !setup the path for it and pass it the 3 args
  SwaggerModule.setup('api', app, document);


  $2- added more config to the main.ts
    const config = new DocumentBuilder()
    .setTitle('NestJS api')
    .setDescription('Use the base API URL as http://localhost:3000/api')
    .setVersion('1.0')
    .setTermsOfService('https://example.com/terms')
    .setLicense('MIT', 'https://opensource.org/licenses/MIT')
    .addServer('http://localhost:3000/api')
!-------------------------------------------------------------
$3- add Tags to each endpoint in the controller
    import { ApiTags } from '@nestjs/swagger';
    @ApiTags('users'), ..ect

!-------------------------------------------------------------
$4- document every aspect about each request and what kind of response we expect 
the params and query and body !

start with adding information about slugs or id : params
£params:
    and it will show 
        import { ApiProperty ,ApiPropertyOptional} from '@nestjs/swagger';
    @ApiProperty({description: 'id of the user',example: 1})  
    @ApiPropertyOptional({})

£query: inside the controller udner the method , bcs by default it is required
    import { ApiQuery } from '@nestjs/swagger';
   @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    example: 10,
    description: 'number of users per page',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,    example: 1,
    description: 'number of page',
  })
  //REVIEW 
£set :name , required , type , example , description for params , query and body 
$ than response and expectations and description for the method
the description will be shown in the UI after
 @ApiOperation({
    summary: 'get all users or get user by id',
  })

  now the response:
  @ApiResponse({
    status: 200,
    description: 'users found',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'number' },
          firstName: { type: 'string' },
          email: { type: 'string' },
        },
      },
    },
  })

  ?we did nested DTO and complex one with date , url , array , nested objects , json ..ect
  ?very good one 
  //REVIEW
  new 
  nested DTO
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePostMetaDataDto)
  metaOptions: CreatePostMetaDataDto[];



SO FAR 
we created an endpoint and dto and tested it and now we document it using swagger ui
with tags and info about , body , params,query, api tag , description, required or not , api response shape 
   
-- after adding validation , on the swagger there is no  example for body, result , params , query.!

  //REVIEW 
$so on the dto :@ApiProperty({description , example}) , @ApiPropertyOptional()
than we will find the body and schemas filled 
  @ApiProperty({
    description: 'title of the post',
    example: 'title of the post',})

  //REVIEW 
    documenting complex objects :
      @ApiPropertyOptional({
    description:
      'meta options of the post, if you want to add meta options , make sure to follow the stucture',
    required: false,
    type: 'array',
    items: {
      type: 'object',
      properties: {
        key: {
          type: 'string',
          example: 'sidebarEnabled',
          description: 'key of the meta option',
        },
        value: {
          type: 'any',
          example: true,
          description: 'value of the meta option',
        },
      },
    },
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePostMetaDataDto)
  metaOptions?: CreatePostMetaDataDto[];

  //REVIEW 
## Mapped Types
1 provide a proper response:
  @Post()
  @ApiOperation({
    summary: 'create a new post',
  })
  @ApiResponse({
    status: 201,
    description: 'you get a 201 response if your post is created successfully',
  })
  @ApiResponse({
    status: 400,
    description:
      'you get a 400 response if your post Body is not valid',
  })
      //REVIEW 
2 mapped types and how to document partial dto
below the controller method we add tags
use mapped types to show swagger info about the dto

 import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';
import { CreatePostDto } from './createPost.dto';

export class PatchPostDto extends PartialType(CreatePostDto) {
  @ApiProperty({ description: 'id of the post' })
  @IsInt()
  @IsNotEmpty()
  id: number;
}



//TODO                                 
//TODO                                 
//TODO
//TODO
//TODO
//TODO
compodoc

what it is : used to document the code , all providers and controllers 
its for me and developers 

installation:
npm i  @compodoc/compodoc 

add a command in package.json
    "doc":"npx @compodoc/compodoc -p tsconfig.json -s  --port 3001 --watch -d ./documentation"

run it 
npm run doc

after running this and fixing the powershell issue 
putting in it on env variables : system
C:\Windows\System32\WindowsPowerShell\v1.0\

now we have poor code coverage

this means we did not commnet the code manually , JSDOC

compodoc expect from us JSDOC comments
document the main class and 2 methods 
so we add comments for each class and method


*/
