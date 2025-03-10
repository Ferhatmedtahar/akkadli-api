/*
Unit Testing:
- we have this spec files for example : provider.ts and provider.spec.ts
- its recommended to have the same name and same folder structure

- there we write unit test 
- jest is used
- test each unit in isolation
- each method in isolation'

- how to test a method in isolation and it have dependencies with other methods?
like jwt , config , user..ect

- we use mocks to mock the dependencies.

!----video 2---
- fix the config on package.json and test directory

 "jest": {
    "moduleFileExtensions": [
      "js",
      "json",
      "ts"
    ],
    "rootDir": "./",
    "modulePaths": [
      "<rootDir>"
    ],
    "testRegex": ".*\\.spec\\.ts$",
    "transform": {
      "^.+\\.(t|j)s$": "ts-jest"
    },
    "collectCoverageFrom": [
      "**remove_number/*.(t|j)s"
      ],
      "coverageDirectory": "../coverage",
      "testEnvironment": "node"
    }
      "json-e2e.json"
      {
  "moduleFileExtensions": ["js", "json", "ts"],
  "rootDir": "../",
  "modulePaths": ["<rootDir>"],
  "testEnvironment": "node",
  "testRegex": ".e2e-spec.ts$",
  "transform": {
    "^.+\\.(t|j)s$": "ts-jest"
  }
}

!----video 3---
- beforeEach, afterEach , beforeAll , afterAll

before each test we create an app using :
const app = await Test.createTestingModule({
  controllers: [AppController],
  providers: [AppService],
}).compile();

and then from the app onject we get the controller and provider and we can use them
and apply test

$ npm run test:watch
$ npm run test:watch -- app.controller for spesific pattern
!----video 4---

we want to test our user service
we go to users and on the providers folder we create users.service.spec.ts


this is the boilerplate :
import { Test, TestingModule } from '@nestjs/testing';

describe('THE TEST', () => {
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({}).compile();
  });

  it('should be defined"', () => {});
});

if we want to test the user , we need only to instantiate module only

//TODO
 we got the serivce and run the test but it fail bcs the dependency is missing

 we need to mock the dependencies

 with in the provider:
         {
          provide: FindOneByGoogleidProvider,
          useValue: {},
        }

for the repository:
     {
          provide: DataSource,
          useValue: {},
        },
        {
          provide:getRepositoryToken(User),
          useValue:{},
        },

        here we want to test only one method not all of them

!----video 6---

we want to test user service createUser

we mock this service with empty object,this service is calling another method

we need to mock that method inside the other serivce

const mockCreateUserProvider: Partial<CreateUserProvider> = {
createUser :(args)=>{return}



!----video 7--- mocking repository

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

this will take all the method on the repository and make them optional
and jest.mock 

we checked and we need 3 methods on the repository
findOne , create , save



type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;
const createMockRepository = <T=any>(): MockRepository<T> => (
  {save: jest.fn(),
    create: jest.fn(),
    findOne: jest.fn(),
  }
)


!----video 8--- mock mail service , hashing serivce 
we check what we are using on the provider and what we need to mock

hashPassword , sendWelcome is the functions we need to mock
 {
          provide: MailService,
          useValue: {
            sendUserWelcomeEmail: jest.fn(() => Promise.resolve({})),
          },
        },
        {
          provide: HashingProvider,
          useValue: {
            hashPassword: jest.fn(() => user.password),
          },
        },

!run all tests
on package json :
    "test": "jest --verbose",


//REVIEW
//REVIEW
🛠 Workflow for Writing Unit Tests in NestJS
1️⃣ Understand the Functionality to Be Tested
Identify the function or provider you're testing.
Determine its dependencies (e.g., repositories, services, providers).
List expected inputs and outputs.
2️⃣ Set Up the Test Environment
Use Jest as the testing framework.
Import Test and TestingModule from @nestjs/testing.
Use getRepositoryToken() for repositories.
Mock any external dependencies (e.g., database, third-party services).
3️⃣ Define and Implement Mocks
Create a MockRepository type for the repository.
Implement createMockRepository() function with jest.fn().
Mock external services like MailService and HashingProvider.
4️⃣ Create the describe Blocks
Start with a describe block for the provider or service.
Use beforeEach to initialize the module and inject dependencies.
5️⃣ Write Tests for Happy and Edge Cases
Use it() to define each test case.

Structure test cases with:

Arrange – Prepare data and mocks.
Act – Call the function being tested.
Assert – Verify the result using expect().
Cover different scenarios:

✅ Successful execution.
❌ Errors and exceptions.
🛠 Edge cases (e.g., missing data, duplicates).
6️⃣ Ensure Proper Assertions
Check if repository functions (findOne, create, save) are called with the expected arguments.
Verify that functions return the expected result.
Use toHaveBeenCalledWith(), toBeInstanceOf(), and toEqual() for assertions.
7️⃣ Run and Debug Tests
Use npm test or yarn test.
If a test fails, check:
Mock data correctness.
Expected vs. actual values.
Missing function calls.

*/
