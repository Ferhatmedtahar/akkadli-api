/*
File Upload:
- till now we are interacting with api using json content type , we exchange data using json
- but we can also upload files to our api , so we use multipart/form-data
- when sending a request tp upload a file to an api endpoint , we use multipart/form-data
- we use multipart/form-data instead of application/json
- FileInterceptor(): his job to extract the file from the route handler
- the controller remain the same @Post() 
- we use @UploadedFile() decorator to extract the file from the request]
- we will have upload service to upload on S3 bucket and return url and we store it in the database
- it use CDN like cloudfront to serve the files on multiple regions
- s3 in the storage
- cloudfront sync our files to multiple regions


!---video 2---
setup s3 bucket

s3 require credentials and payment

search for s3 service in aws
give it a name  and object ownership

make them public and generate public policy....ect


!----video 3---
- install aws sdk and types of multer to proccess file upload
$npm i aws-sdk@2.1643.0 
$npm i -D @types/multer@1.4.11

- add env vars:

AWS_PUBLIC_BUCKET_NAME=
AWS_REGION=us-east-1
AWS_CLOUDFRONT_URL=  
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=

- add to app config and update env validation

- go to main.ts and import config from aws sdk
- using app object we can access the env vars config service  app.get(ConfigService)

- generate module and controller and service called ://!uploads

- create uploads entity: should have :id , name , path ,type, size, mime, createdAt, updatedAt, deletedAt


- type is enum image only now
- mime: is multipurpose internet mail extension:indicate format of a document 
- any media file has a mime type for each extendtion 


- create upload file Post method on controller ,
we use UseInterceptors() decorator to add the file interceptor 
  and add it on the method @UploadedFile()file: Express.Multer.File

@ApiHeader([
{name:"Authorization",description:"Bearer token"}
{name:"Content-Type",description:"multipart/form-data"}
])



and then create service called upload service

steps:
1- upload to s3 , another provider 
2- generate a new entity on the database  : name, path, type, size, mime
3- generate file name : return 
---

created a aws-uploader service : this will upload to s3 
 create new s3 , upload result = await s3.upload({bucket:name ,body: buffer , key:filenamewe generate, contentType: }).promise()


generateFileName: extract filename , remove whitespace, extendtions, timestamp, random uuid

 */
