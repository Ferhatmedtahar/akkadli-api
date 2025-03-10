/*
Strategy Notification Emails

- now we are not sending welcome email to the users
- MailTrap is a fake email service and online service that allow you to test emails
- login there and get the smtp details
- once we finish the project we will send real emails
- we will use Ejs: template engine to send emails and compatible with node mailer
- we can use handle bars or pug too


!-------video 2-------
- create a email module , services , we dont need a controller 
- install dependencies
- add environment variables and validate them and add to config
- create templates directory and file welcome.ejs

$ nest g module mail --no-spec

$ nest g service mail/providers/mail --flat --no-spec

dependencies:
$ npm i @nestjs-modules/mailer nodemailer ejs

- We added : MAIL_HOST,MAIL_PORT,SMTP_USER,SMTP_PASSWORD'
validate , add to app


!-------video 4-------
@Global()
@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [],
      inject: [ConfigService],
      useFactory: async () => {
        return {};
      },
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}


this will be used in any module without explicit mention

also we will inject the mailer.forRootAsync({imports:[], inject:[ConfigService],})

this will inject to the mailer serivce  

!import {EjsAdapter} from "@nestjs-modules/mailer/dist/adapters/ejs.adapter"

-----------------------------------------------
we did this on mailtrap module , typeOrm module

to inject this modules we use forRootAsync({
  imports: [],
  inject: [],
  useFactory: (configService) => {
    return {obj};
  },})


!-------video 5-------
- create a service to send welcome emails 
- we also want to inject some information about the user to the template
inject the mailer service
.sendMail({
  to , from , subject , template
context:{ name , email , loginUrl }
})

on welcome.ejs to inject the user name
<%= user.name %>

go inject it on the constructor of the user service

before on the dist folder , we need to intruct nest js to copy and compile the templates


{
  "$schema": "https://json.schemastore.org/nest-cli",
  "collection": "@nestjs/schematics",
  "sourceRoot": "src",
  "compilerOptions": {
    "deleteOutDir": true,
    "assets": [
      {
        "include": "./mail/templates",
        "outDir": "dist/",
        "watchAssets": true
      }
    ]
  }
}



enable css
            adapter: new EjsAdapter({ inlineCssEnabled: true }), on mailer module
*/
