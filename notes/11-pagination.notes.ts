/*
Pagination:
- now we are not paginationg any of the responses we are sending
- alot of stress on the database and alot on the client to handle
- we need to implement pagination
- we need to add a limit and offset to our queries
- paginated query look like :

http://localhost:3000/posts?limit=10&page=0
SELECT * FROM posts
LIMIT 10 
OFFSET 0

- this will get us elegant and faster wa and query

- our get response will look like :
{
data:[],
metaData:{totalItems, itemsPerPage , currentPage,totalPages},
links:{first,prev,current,next,last}
}

- pagination is common on all entities.

- create common folder , any modules that relate to all entities will be there
 from swagger
$ export class GetPostsDto extends IntersectionType( GetPostsBaseDto,  PaginationQueryDto) {}

- so we created a common dto of pagination and whenever we need extra queries we just do 
  IntersectionType(GetPostsBaseDto,PaginationQueryDto)

 - added skip , take to the query thats all
    return this.postRepository.find({
      where: { author: { id: userId } },
      skip: (postquery.page - 1) * postquery.limit,
      take: postquery.limit,
    });

its working ! now we need to get metadata and links and make sure it fit in all entities



- creating seperate module for pagination
- created pagination module , dirs :providers ,interfaces 

inside the interfaces we created paginated interface
export interface Paginated<T> {
  data: T[];
  metaData: {
    totalItems: number;
    itemsPerPage: number;
    currentPage: number;
    totalPages: number;
  };
  links: {
    first: string;
    prev: string;
    current: string;
    next: string;
    last: string;
  };
}


this is how to inject req
  constructor(
    
   injecting request object 
    
   @Inject(REQUEST)
   private readonly request: Request,
 ) {}
   const baseUrl = `${this.request.protocol}://${this.request.headers.host}`;
    const newUrl = new URL(this.request.url, baseUrl);

repository.count()
 const finalResponse: Paginated<T> = {...}

 use generic Type always on common modules

*/
