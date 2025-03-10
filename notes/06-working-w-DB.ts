/*
 * 
 * Working with DB
 * adding 2 layers:  ORM layer and database layer

!-------video 1-------
the controller does his job by routing the request to the service 
so data persists in the database happens in the service only


!-------video 2-------
there are titly connected orms : typeOrm ,mongoose
other we can do : sequelize , prisma , etc

orm advantages :
- easy to use and no need to write queries SQL
- everything in objects
- easy to manage relations between objects and tables
- create index 


!-------video 3-------
intall postgres sql locally
from www.postgresql.org/download/

WE GOT APP CALLED pgAdmin  , similar to compass mongodb

- created new database



!-------video 4-------
- added the Path that we can use postgres on the terminal:
$ psql --version
psql (PostgreSQL) 17.2



!-------video 5-------
connect to the database with nestjs , using typeorm
typeorm require a driver to be installed to a database like sqlite3 , mysql 
@nestjs/typeorm , typeorm , ...

command : 
$ npm  i typeorm @nestjs/typeorm pg


WE go to app.module.ts and add the typeorm module

import it and add on the import array and than add the settings  to connect to our database



import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    UsersModule,
    PostsModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      entities: [],
      synchronize: true,
      port: 5432,
      username: 'postgres',
      password: 'FERHATSAKI',
      host: 'localhost',
      database: 'nest-blog',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})

if we pass wrong password we get an error 

!-------video 6-------

the previous video was to connect to the database synchronously

we can do it asynchronously :
we do it by using the useFactory function and forRootAsync
now we can inject configuration service .

@Module({
  imports: [
    UsersModule,
    PostsModule,
    AuthModule,
    TypeOrmModule.forRootAsync({
      useFactory:()=> {
        return {
          type: 'postgres',
          entities: [],
          synchronize: true,
          port: 5432,
          username: 'postgres',
          password: 'FERHATSAKI',
          host: 'localhost',
          database: 'nest-blog',
        }
      },
    }),
  ],


----------video 7--------
understanding the Repository pattern
it provide us with all the features type  orm offer 
it is a way to interact with the database

user.entity.ts : user table : signle not plural

- typeorm create repository
- usersRepository.ts : its not a file , its something injected into the users.service.ts
- entity is decorator and exported  class from user.entity.ts

so we create the entity in one file
go to .service.ts and inject the repository using
 constructor(@InjectRepository(User) private readonly usersRepository: Repository<User>)
 findall(): Promise<User[]> {
   return this.userRepository.find();
 }
!-------video 8-------

//TODO always make sure the entity fields match create on the dto 

once we finish creating our entity 
we need to inform the app module about it :
     entities: [User], in the connect to database config

!-------video 9------- 

in the entity file we can add few things and configs 
  @Column({
  type: 'varchar',
  length: 64,
  nullable: false,
  unique: true,
  })
  we can readmore https://typeorm.io/entities#column-options

  we think about database as guard one and dto as guard and guide two

  so the dto transform and guard and the datbase is the gatekeeper
  so database and dto should have the same rules ,{consistency} 


!-------video 10-------
- go to pgAdmin and check the database
- check the schemas and we find that autoSync created the table but empty
- migrations is for production
- so we go to the module and inform it about the entity on the 
imports:[TypeOrmModule.forFeature([User])]
- go to the contructor of the service 


summary:
to connect to database:
- add on the app.module.ts the typeorm imports and config the database
- create an entity and configure each param to match the dto
- inform the responsible module about the entity :`TypeOrmModule.forFeature([Name])`
- inject on the service :
 `constructor(private readonly usersRepository: Repository<User>)`
- use the repository methods to interact with the database on the methods
!-------video 11-------

- name the table singular
- check the database on pgAdmin and check the table name and 
click right click  and check view to visualize it 

if we have enum 
  @Column({
    type: 'enum',
    enum: status,
    default: status.DRAFT,
    nullable: false,
  })
  status: status;

  for date
    @Column({
    type: 'timestamp',//date on mysql
    nullable: true,
  })
  publishOn: Date;'

//BUG
//BUG
summary :
- create a entity and match its value and constraints with the dto
- inform the module of that entity :TypeOrmModule.forFeature([Post])]
- inform the app module about the entity on the imports: entities: [Post,...]
- inject the repository on the service :
`constructor(private readonly postsRepository: Repository<Post>)`
- use the repository methods to interact with the database on the methods

*/
