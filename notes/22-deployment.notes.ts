/*
main is to learn how an application is deployed from scratch
Deployment Strategy:

- EC2 intance , instead of Heroku , render 
- we will create VM and install ubuntu and isntall dep that are required 
- give you knowledge about the deployment process and how a nest js app in running on a computer 


- how the app is working under the hood on the server.
- we can pick the intfrastructure that we want to use in aws
- we need to have a postgres , nodejs ,nginx installed 
- nginx is a web server and proxy server
- we will use it as reserse prozy and use it to route the request to the localhost
along with the headers.

- nginx sit between the request which come to the port 80 or 443 : depends if we use ssl or not
 and route it to the localhost 3000.

- another problem which we might run into is : KEEP APPlication RUNNING ON THE SERVER

- so we will use pm2.
- pm2 is a program that keep the app running in the background and manage logs

!___ so we need postgres , nodejs , nginx , pm2 , EC2

1- create new EC2 instance
2- select correct region
3- go to instances and button to lunch instance
4- give it a name and click how much instances we want
5- select ubuntu , instance type 
6- key pair to use openssh
7- auto-assign public ip selected
8- create security group 
9 - choose ur own ip
10 - allow https , http and ssh
11 - configure the storage 
12 - launch the instance and create new security group

! we can see the ip adress  and the public dns

!--------------------------------------------------------------------
!- copy the dns address and ssh into the terminal  
establish ssh connection
pattern : ssh -i /path/to/key.pem instance_user_name@instance_dns_name

$ssh -i path ubuntu@ec2-3-234-234-234.compute-1.amazonaws.com

check if git available or not:

$git --version

to update the system
$sudo apt update


install nvm : here link: https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating

$curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash

!---------------------------------------------------------------
!---exit and close the terminal and connect again via first command:
install and check the version of nvm
$nvm --version
$nvm install --lts
$nvm use --lts

check if node is available or not:
$node -v
$npm -v
$git --version

!---------------------------------------------------------------
we need postgres to connect it our nest 
we might have in future a dedicated database server instance , in that case we would the details on our env
- installing postgresSql:

$sudo apt install postgresql

$psql --version

- setup password for postgres:
$ sudo -i -u postgres
- enter the interactive mode
$psql

$ \password

£enter the new password and confirm

£list databases that exist
$ \l 

£create a new database 
$ CREATE DATABASE nest_blog;

£quit , click q then
$ \

!---------------------------------------------------------------

install nginx and configure:
which will be a reverse proxy web server for us , so we will catch all incoming request
and point then to the localhost 3000 , nginx listen on post 80 and 443 and will route it


$sudo apt install nginx

check default ubuntu fireware if active or not :
$ sudo ufw status

if active we can disable it :
$ sudo ufw disable

$systemctl status nginx
we find it enabled

go to this path
$cd /etc/nginx/sites-available
$ls

we find just one file :default
$nano default

make a copy of the default file :

$sudo cp default default-copy

we want to point it to localhost 3000 

change the location check image 128

using the dns name : paste it on browser and we should see the nginx page
example : http://ec2-3-234-234-234.compute-1.amazonaws.com

restart nginx
$sudo systemctl restart nginx
$systemctl status nginx


hit :http://ec2-3-234-234-234.compute-1.amazonaws.com and we should get Bad Gateway 502


!---------------------------------------------------------------
now we have all the dependencies installed and the server is running
we installed git ,nvm , npm , node, postgres and nginx and config and created a database

we need now to install the nest js application and the nest cli

$npm i -g @nestjs/cli

clone the entire project so:
$create a dir anywhere we want : we go on the root
$mkdir nest-app
$cd nest-app
$git clone https://github.com/Ferhatmedtahar/nest_start .
$npm intall


!---------------------------------------------------------------

create .env and paste it
$nano .env
change the password and database name , disable DatabaseSync.
press ctrl + o  and exit

!---------------------------------------------------------------
What is migration ?

- migration is a process of changing the structure of the database
- we can use migration to add new tables , change the structure of the tables

-- migrations are not required in mongoDB
-- when we are in dev , we set synchronize to true , this will sync DB to entity files 
-- when we are in prod , we set synchronize to false , bcs this can corupt the DB
-- we control the DB with migrations
-- we have version control for code , migration are version control for DB
in src we have folder migrations : files are in sequence.

-- each migration have timestamp-firstMigration.js
example: 1719918754962-firstMigration.js

-- typeorm use this migrations to sync the DB

-- nest js dont have a integration with migrations , 
so to run a migration we have to create a  Datasource with the DB details

!---------------------------------------------------------------
-- add it to gitignore : typeorm-cli.config.ts
-- create a configuration file on the root: typeorm-cli.config.ts
import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'FERHATSAKI',
  database: 'nest-blog',
  entities: ['**ESPACEREMOVED/*.entity.js'],
  migrations: ['migrations/*.js'],
});


-- create migrations folder on the src! and do this command  

$ npx typeorm migration:generate src/migrations/firstMigration -d dist/typeorm-cli.config.js

each migrations is a class that have up and down methods to create or go back
-----we can try if we go to the config cli and change to another database


-login to the server ssh to it 
$git pull origin main 
!because we palce a sample file on the root of config 
$ cp typeorm-cli.config.sample.ts typeorm-cli.config.ts
!in another tab ssh to the server and run this command

$sudo -i -u postgres

$\l
-- go to the database and check the tables
$\c nest_blog;
$\dt;


$nano typeorm-cli.config.ts
change the password , database 
cnrl + o and exit

$cd src
$mkdir migrations

-- build the app
$npm run build

$cd ..
$ls -l

- go to the dist folder and see if the app built successfully
$cd dist
$cd src

-- go back to the root
$cd ..

-- create teh migrations:
$ npx typeorm migration:generate src/migrations/firstMigration -d dist/typeorm-cli.config.js

-- check the migrations:
$cd src/migrations 
$ls

--
$nano typeorm-cli.config.ts
add import {FirstMigration} from './src/migrations/1719931677337-firstMigration';
migrations:[FirstMigration]


--build the app:
$npm run build

-- run the migrations:
$ npx typeorm migration:run -d dist/typeorm-cli.config.js

-- check the tab of database :
$\dt;


!---------------------------------------------------------------
we can start now the nest js app
$npm run start

it will run on port 3000 successfully
we will go :

http://ec2-3-234-234-234.compute-1.amazonaws.com 

we will get response and check the documentation page


now the app is deployed

ONE PROBLEM LEFT:we cant exit the terminal because it will close the server 

we need to keep the server running in the background and manage it with pm2

$npm install pm2 -g

$pm2 start npm --name nestjs-blog -- start

check it on browser and it should be running

check all application running:
$pm2 list
we can restart , reload , stop , delete , list , start

$pm2 startup

copy the command we get and paste it 

$pm2 save

Deployment Summary
Deployment Strategy:
Deploy a NestJS app on an AWS EC2 instance instead of Heroku/Render.
Use Ubuntu VM and install all required dependencies.
Learn how the app runs under the hood on a server.
Use Nginx as a reverse proxy to route traffic to localhost:3000.
Ensure the app keeps running using PM2.
Install PostgreSQL, Node.js, Nginx, and PM2 on the server.
Deployment Steps:
Create an EC2 Instance

Select region, Ubuntu OS, and instance type.
Configure security groups (allow SSH, HTTP, HTTPS).
Launch instance and get Public DNS.
Connect to EC2 via SSH

Use SSH command to connect to the instance.
Update the System & Install Dependencies

Install Git, NVM, Node.js, PostgreSQL, and Nginx.
Configure PostgreSQL

Set up a new database and user credentials.
Set Up Nginx as a Reverse Proxy

Modify Nginx config to forward requests to localhost:3000.
Deploy NestJS App

Clone the repository, install dependencies, and configure .env.
Generate and run database migrations with TypeORM.
Start the application.
Keep the Application Running

Use PM2 to manage the application in the background.
Enable PM2 startup to persist after reboots.
*/
