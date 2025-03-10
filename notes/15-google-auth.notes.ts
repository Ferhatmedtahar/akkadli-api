/* Google Authentication Strategy and setup

- we will use google auth to authenticate our users as well

- in our website the user can click on the google sign in button

- once its finished google return //!JWT {login ticket}

- second step that the logic ticket is sent to the backend

- backend will validate the ticket and check if the user exists , if not create new user
if exists generate tokens and send them back to the client.


!------video 2-------
 
we need to create GOOGLE PROJECT  on google cloud 

- go to console.cloud.google.com
- create a project
- select the project
- enable APIs and services , Oauth consent screen , fill the details

back to dashboard , once we happy we can publish the app: public the app

- go to credentials and click on create credentials and Oauth client Id and select app type and give it a name


- provide js origins: whitelist the origins that can be used http://localhost:3500
bcs we will use react app.

 authorized redirect URIs

 client id:
client secret:

now after we added this to the env dev and validate them ,//! we add them to the jwt config

    googleClientId: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,

isntall this package:
$ npm i google-auth-library


- create a controller and a service: we can have a many controllers and services as we want 

$ nest g co auth/social/google-authentication --flat --no-spec
CREATE src/auth/social/google-authentication.controller.ts (134 bytes)
UPDATE src/auth/auth.module.ts (1263 bytes)

$ nest g pr  auth/social/provider/google-authentication.provider --flat --no-spec
CREATE src/auth/social/provider/google-authentication.provider.ts (109 bytes)
UPDATE src/auth/auth.module.ts (1394 bytes)



updated our entity user: password now can be null and the user also add googleId 

create dtos folder  and google-token dto

$enable cors: in the main app.ts because we will use react app  

!app.enableCors();


!------video 4-------
initialize google auth client

we will use the library google-auth-library

private oauthClient: OAuth2Client;

and we want this to be initialized in the onModuleInit when the module is initialized

  onModuleInit() {
    const clientId = this.jwtConfiguration.googleClientId;
    const clientSecret = this.jwtConfiguration.googleClientSecret;
    this.oauthClient = new OAuth2Client(clientId, clientSecret);
  }

!------video 5-------
implementation Strategy Google Authentication

    1//!verify the google token sent by the user
    2//!extract the payload from the Google JWT
    3//!check if user exists in our database using googeId
    4//!if google id exists generate tokens
    5//!if not create a new user then generate tokens
    6//!if error send unauthorized

findUserByGoogleId on the users services to find a user by googleId


!------video 7-------

we need a front end to try to send the google token to the backend
create react app
we selected port 3500

$ npm i @react-oauth/google

did some ui basic from this 

created a createGoogleUser provider that will create a google user : users services
created a findUserByGoogleId provider that will find a user by googleId in :auth services


!GoogleAuthenticationService finished

*/
