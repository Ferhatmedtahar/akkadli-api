/*
User Auth:
- password Based Authentication
- third party authentication: Google Auth


- we need to hash and salt the password before it is stored in the database
- authenticate the users by :
  compare the password with the one in the database after hashing it 
  Issue a JWT token and send it back to the client
- authorize the user by {only on the endpoints that need to be protected}:
  verify the JWT token
  check if the user has the right role


!-------video 2-------
hashing and salting: theory
hashing is a one way function , cryptions is a two way function.

- hashing is the process of generating  fixed size output from variable size input
- calculated by a one way algorithm , mathematically
- hashing same input gives same output
- salting is the process of adding random value string to the input before hashing
- salting is done to make the hash more secure
- final string we store
- to verify we compare using bcrypt.compare

!-------video 3-------
using auth module  : it have circular dependency with users module 

create 2 providers : one for hashing, bcrypt provider

created abstract hashing provider:
abstract method for hashing a password and return it 
abstract method to compare password and hashed one in the database


!-------video 4-------
thats all
$ npm i bcrypt@5.1.1
import * as bcrypt from 'bcrypt';

hashPassword: create bcrypt.getSalt() , bcrypt.hash(data, salt)
comparePassword: bcrypt.compare(data, encrypted)
!-------video 5-------

implementing signup : easy


first we get error on the module bcs we are passing abstract class
 and classes can not be instantiated
so we use object telling that the useClass is bcryot 
and the abstract who have the methods provide 
  providers: [
    AuthService,
    {
      provide: HashingProvider,
      useClass: BcryptProvider,
    },
  ],

  we passed , the advantage of this is that we can change the hashing provider easily
  
- now we go inject the HashingProvider not bcrypt bcs its implementing the abstract class
- since we are using circular dependency , on the service we need to use
@Inject(forwardRef(() => HashingProvider))

!-------video 6-------

implementing login
so we implemented a provider inside of it method that find user by id
 in its users module and inject it to user service in a proxy method
use it in the auth service and compare the passwords 
return token , for now we return sample token not JWT yet
!-------video 7------- 
handle errors and finish the login method
signUp is process of creating a new user so we just hash password in it but it beling to user entity
signIn is process of authenticating a user so its in auth service 
!-------video 8-------
- jwt :is a coded string that represent a user and its role
- it contain 3 parts: header , payload ,signature
- header comtain algorithm and type of token
- payload contain user id and role and any data like Iat , exp

- signature: is a hash of the header and payload + a secret key

the secret key is the only one who can decrypt the token


process of Authenticating a user in:
- verify credentials
- issue a token
- return token

user accessing protected endpoints:
- verify token
- check if user has the right role

!-------video 9-------
integrating JWT 
$ npm i @nest/jwt

add some env vars
JWT_SECRET="FERHATSAKIFERHATSAKIFERHATSAKIFERHATSAKI"
JWT_TOKEN_AUDIENCE="localhost:3000"
JWT_TOKEN_ISSUER="localhost:3000"
JWT_ACCESS_TOKEN_TTL="3600"


- create config folder and file in the auth , we can do it also globally
export default registerAs('jwt', () => {})
- import ConfigModule and  JwtModule.registerAsync(config.asProvider()) on imports Array
```
  imports: [
    forwardRef(() => UsersModule),
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
  ],
```

confuguration injection 
    /**inject  config service
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,

    
   const accessToken = await this.jwtService.signAsync(
      {
        sub: user.id,
        email: user.email,
      },
      {
        secret: this.jwtConfiguration.secret,
        expiresIn: this.jwtConfiguration.accessTokenTTL,
        audience: this.jwtConfiguration.tokenAudience,
        issuer: this.jwtConfiguration.tokenIssuer,
      },
    );
    console.log(accessToken);


*/
