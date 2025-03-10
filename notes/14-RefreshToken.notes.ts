/*
Refresh Token:
- our tokens now which we issue every time a user logs in are short lived:3600s=1h
- we need a longer lived token called refresh token
- tokens act like identifiers has a short live time because they are used to authenticate a user
 and if i take someone else token i can use it to make a request
- shorter time of token THE MORE SECURITY
-the purpose of Refresh token is to generate a new access token when the old one expires

- refresh token usually have only sub as payload and they shouldnt have the same payload

- refresh token are JWT as well , with minimal payload and longer TTL
- both will live on the localstorage or cookies

- developers keep track on the access token when its about to expire,
 send request to generate new set of tokens  

- in order to generate new set of tokens we need to send refresh token to the server

!------video 2-------
creating our first refresh token

- whenever the user sign in to the app we want to generate a refresh token and access token

- added the env variable TTL and config and validate it.
- added refresh token dto.

- both tokens need :
  public async signToken<T>(userId: number, expiresIn: number, payload?: T) {}
  userId which is the sub and expires in 
  and payload which is optional like email , probably can grow for role for example



!------video 3-------
now we create a generate token service that will take a token and generate both

so now we have center place to generate tokens
  public async generateTokens(user: User) {//! generate access token ,the refresh token}


  now we finished 50% , the user will always get a access token and a refresh token
the rest is to generate a new access token whenever a refresh access token is made 


!------video 6-------
we need to add the refresh token endpoint to give the user ability to refresh the token
*/
