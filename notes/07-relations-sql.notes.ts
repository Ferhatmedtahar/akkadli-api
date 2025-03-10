/*
!---video 1---

there are 3 major advantages of having relational database
- no duplication of data : instead of saving data in 2 diff places
- accurate data : contraints on each columns
- flexibility : we can add more columns and grow

relations in sql:
- one to one : post ---metaOptions
- one to many: user -->posts
- many to many :  posts <--> tags

!---video 2,3,4---
our post entity have a relation with tags and metaOptions
    post <--> tags many:many
    post -- metaOptions 1:1


we created a module and a controller for tags and meta options
so we created tags and metaoptions entities 
validate and transform the manual fields on the dto
auto like createdate and updatedate and delete date and id

 
learned about this :
      @DeleteDateColumn(): this is a soft delete
      @CreateDateColumn()
      createDate: Date;
      @UpdateDateColumn()
      updateDate: Date;

learned also about JSON , urls , array  and validating them 

!---video 5---
we did auto Load for entitties instead of manually adding them on the app module
          autoLoadEntities: true,
          //entities: [User, Post],

- then adding them each entity to the module by adding them to the imports array
`imports:[TypeOrmModule.forFeature([Post])]`

- then go to the pgadmin and refresh , we should be able to see them

!---video 6 ---  RELATIONSHIPS
one to one relation
- this is one of the simplest relation where the primary key of a table 
is a foreign key in another table

- in our case we have post and metaOptions
we have a field on the row called metaOptionsId and this is a foreign key to the metaOptions table

!---video 7--- UNIDIRECTIONAL ONE TO ONE RELATIONSHIP

unidirectional one to one relationship is when we have a relation between 2 tables
and ONLY ONE TABLE IS AWARE OF THE RELATIONSHIP
like imagine we montion the @onetoone decorator only on the post entity

!---video 8--- 
-- we get a uni relationship when we montion the relation only on one side
MetaOption entity name
import { OneToOne } from 'typeorm';
  @OneToOne(() => MetaOption)
  @JoinColumn()
  metaOptions?: MetaOption;

  we replaced this ::metaOptions?: CreatePostMetaDataDto[]; by MetaOptions

join column means that the  relation ship column is on the post entity : table


*so we added two tages : OneToOne and JoinColumn
*and changed the metaOption type to MetaOption : name of the entity

!---video 9---
create a service for metaOptions entity

created a service for metaOptions and controller and saved in the database and alot of stuff

now we need to create it and connect from the post entity ,that's why we have 1-->1 relation

when sending json over the network :
 add this "\"  to escape the double quotes

so that we connect these two entites we went to the dto and and entity and we match it 
and make type conversion on the property which contain metaoptions to be validate using the other one dto

- go to service  and add method of creating post .
- its not good to use repository of a diff entity in another entity

    1 create  meta options
WE NEED TO GET ACCESS TO THE MetaOptionsRepository to create it !
we add it module imports than on the constructor 
@InjectRepository(MetaOption)
    private readonly metaOptionRepository: Repository<MetaOption>,
    2 create post
    3 add meta Options to the post , {entire object not just the id}
    4 return the post

      public async create(@Body() createPostDto: CreatePostDto) {
    //1 since metaoptions is optional, we check than create  meta options
    const metaOptions = createPostDto.metaOptions
      ? this.metaOptionRepository.create(createPostDto.metaOptions)
      : null;
    if (metaOptions) {
      await this.metaOptionRepository.save(metaOptions);
    }
    //2 create post
    const post = this.postRepository.create(createPostDto);

    //3 add meta Options to the post#
    if (metaOptions) post.metaOptions = metaOptions;
    //4 return the post
    return await this.postRepository.save(post);
  }


  call it on the controller and test it using http post request with httpyac or postman




!---video 10--- CREATE  , Delete , Get , Update relationships: post-->metaOptions

we will now use cascade to create for example 
before we created the metaOptions and the post separately
check if exist than establish the relationship

using Cascade we can create the post and the metaOptions at the same time in single save

  @OneToOne(() => MetaOption, { cascade: true })    //cascade
  @JoinColumn()
  metaOptions?: MetaOption; // type of the entity

we end up with this code:
`
  public async create(@Body() createPostDto: CreatePostDto) {
    //2 create post
    const post = this.postRepository.create(createPostDto);
    //4 return the post
    return await this.postRepository.save(post);
  }


  !---video 11--- : query to get the post with metaOptions
  we need to get the meta options with the post
  easy we just on the query of the post we add object
  * return this.postRepository.find({ relations: { metaOptions: true } });
  * OR
  * @OneToOne(() => MetaOption, { cascade: true, eager: true }) //it will work on insert , update , remove , soft-remove , recover

!---video 12--- : Delete the post with metaOptions

we need to do sequenctial delete , first the post than the meta options
  
!---video 13--- : bidirectional one to one relationship
bidirectional one to one relationship is when we have a relation between 2 tables
and BOTH TABLES ARE AWARE OF THE RELATIONSHIP
this will give us the advantage of having the relation on both sides

in uni-directional we can fetch the post and get the metaOptions cascading 
but we couldn't fetch the metaOptions and get the post pointing to it 

so on bidirectional we can fetch the metaOptions and get the post pointing to it

so on the other side we added
first argument is function return the entity name 
 second is reference to metaOptions on post  
 
 @OneToOne(()=>Post,(Post)=>Post.metaOptions),{cascade:true,eager:true}
  post:Post;
}
on the other entity we added the same thing but with the other entity name
 @OneToOne(() => MetaOption, (MetaOption) => MetaOption.post, {
    cascade: true,
    eager: true,
  })


  !---video 14--- : delete the post with metaOptions bidirectional
  delete cascade 
  we will let the id on the table we want it to be deleted cascade
  so whenever i delete a post the metaOptions will be deleted as well

  so the the id will be placed on the metaOptions table as foreign key
    @OneToOne(() => Post, (post) => post.metaOptions , {
    onDelete:"CASCADE",
  })
  @JoinColumn()
  post: Post;
  this will delete the metaOptions when the post is deleted
  so now we dont need to seperately delete the metaOptions

  !---video 15--- : theorical :one to many , many to many relationship
  user <-->posts
  the foreign key is on the many side always 
  so the post will have a userId or authorId

  we always tell which side is the foreign key is and automatically
  it will add id
  on the user entity we add posts which is an array of posts
  @OneToMany(() => Post, (post) => post.author)
  posts: Post[];

  and on the post entity we add the author
  @ManyToOne(() => User, (user) => user.posts)
  author: User;

  !---video 16 ,17,18--- : create post and assign it to a user

    public async create(@Body() createPostDto: CreatePostDto) {
    //find author from database based on the autor id
    const author = await this.userService.findOneById(createPostDto.authorId);
    if (!author) {
      return { message: 'author not found', error: true };
    }
    //2 create post
    const post = this.postRepository.create({
      ...createPostDto,
      author: author,
    });

    //3 return the post
    return await this.postRepository.save(post);
  }

  many to one 
  one to many 

  !---video 19--- :QUERY get all posts of a user
  
  add on the find method 
  {relations:{author:true}}
  or on the entity
  @ManyToOne(() => User, (user) => user.posts, { eager: true })
  author: User;

  thats all
  !---video 20--- : many to many relationship
  - when we implement many to many relationship in sql we need to create a third table
  for example we have posts and tags
  - each tag can have many posts and each post can have many tags

  - so the third table will have the post id and the tag id as foreign keys and the primary key
  - this is because we can't have an array of tags on the post entity
  - so it hold the relation between the two tables

  - we can have uni directional or bi directional
  
  !---video 21--- : create the many to many relationship
  // REVIEW                                       
  // REVIEW                                       
  // REVIEW                                       
  on uni-directional many to many 
     we do all the things on the owning side

@JoinTable(): this decorator is must be the owning side of the relationship
like here the post is the owning side ,  bcs we need to fetch the tags along with the post as part
 
    @ManyToMany(() => Tag, { eager: true })
  @JoinTable()
  tags?: Tag[];

  and modify the the dto 
    @IsArray()
  @IsOptional()
  @IsInt({ each: true })
  tags?: number[];

  bcs we will take array of ids of the tags

  and on the creation proccess we need to find the tags from the database
  and pass them to the post entity
  not just the ids but the entire object of the tags 

  !---video 22--- : query to get the post with tags
  eager: true
  or relations:{tags:true}

  !---video 23,24--- : update the post with tags

  we first created the controller method and than on the service method
  the service have this steps
  1 find the tags from database based on the tag ids
  2 find the post from database based on the post id
  3 update the properties
  4 return the post

  so once we establish the relationship between the post and the tags we wont touch it 
  if we want to update the tags , we need to get them and assign them to the post and save

  for creation :
  we find the autor if exist or not bcs each post belongs to an author
  than we get the tags and than create the post and assign the values to it 
  and save and return.


    //1 find author from database based on the autor id
    const author = await this.userService.findOneById(createPostDto.authorId);
    if (!author) {
      return { message: 'author not found', error: true };
    }

    //2 find tags from database based on the tag ids
    const tags = await this.tagsService.findMultipleTags(createPostDto.tags);

    //3 create post
    const post = this.postRepository.create({
      ...createPostDto,
      author: author,
      tags: tags,
    });

    //4 return the post


    for query:
    - we just add the relations:{tags:true} , or eager: true

    !---video 27--- :delete 
    for Delete:
     in delete the cascade will take care of it automatically
     it will delete the post and the relationship
  @ManyToMany(() => Tag, { eager: true , cascade: true })

  

  // REVIEW
  // REVIEW
  // REVIEW
  !---video 28--- : bi directional many to many relationship
  on the second entity we add the relation
  @ManyToMany(() => Post, (post) => post.tags)
  posts: Post[]
  second arg is where to fond the tags on the other entity
    
  for the owner is : where we places the join table 
    @ManyToMany(() => Tag, (tag) => tag.posts, { eager: true })
  @JoinTable()
  tags?: Tag[];

  !---video 29--- : delete method on tags to delete tags and the relationship of the post
  add to the tag entity
   { onDelete:"CASCADE" }

  because the owner of relation is the post , so when we delete post
  the relationship will be deleted automatically
  but otherway we cant so we add cascade


  !---video 30---: soft delete
  @DeleteDateColumn()
  
  how soft delete work in relationships
  soft delete is diffrent than hard delete so it expect us to create new endpoints
  
  

  we add new endpoint of delete
  
  @Delete()
  public async SoftDelete(@Query('id', ParseIntPipe) id: number) {
    return this.tagsService.delete(id);
  }

  but wait we have two now : delete and soft delete
  
  $how to differentiate them 
  ITS just by adding a arg to the endpoint http://localhost:3000/tags/soft-delete , method:DELETE

    public async softDelete(id: number) {
    await this.tagRepository.softDelete(id);
    return {
      message: 'tag soft deleted',
      id,
    };
  }

  $soft delete it will just create timestamp and not delete the row

  $the relationship will NOT be deleted but the tag will remain on the database
  */
