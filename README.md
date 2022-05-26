# storeFront_udicity_node_project
### Database 
-database is running on default port 5432.<br/>
-you must create two databse one for test and the second for use.<br/>
-make sure that if you change name of database that you must change it in database.json and .env<br/>
* to create database        ``` CREATE DATABSE storeFront ;```
* to create second database ``` CREATE DATABSE storeFront_test ;```
* config .env and put data about database and all missing data like this :<br/>
    -```POSTGRES_HOST=127.0.0.1```<br/>
    -```POSTGRES_DB=storefront```<br/>
    -```POSTGRES_TEST_DB=storefront_test```<br/>
    -```POSTGRES_USER=###     <- write your user here```<br/>
    -```POSTGRES_PASSWORD=### <- write your password here```<br/>
    -```ENV=dev```<br/>
    -```BCRYPT_PASSWORD=###   <- write text that will join to encrypt password```<br/>
    -```SALT_ROUNDS=10```<br/>
    -```TOKEN_SECRET=###      <- write text that will join to encrypt token```<br/>
    
### Server
-The server will listen on port 3000:<br/>
-to run server successfull<br/>
* run in terminal ```npm install``` to install all packages
* make sure that you do the database steps and server of database is run in correct port and you create the two databases
* run server in terminal by ```npm run server```

### Test
-To run test you write in the terminal ```npm run test``` 
* focus that ```npm run test``` include inside it ```npm run build && npm run jasmine``` so you can run test immediately without run ```npm run build``` 

### Global package
- some of package in node_modules you need to install it global to run project without errors like:-
- npm install -g jasmine
- npm install -g jasmine-ts
- npm install -g @types/jasmine
- npm install -g @dotenv
- npm install -g db-migrate
- npm install -g db-migrate-pg
- npm install -g ts-node

### Scripts
- Install:            ```npm install```
- watch:              ```npm run watch'```,
- test :              ```npm run test```,
- db-migrate up:      ```npm run db-up```,
- db-migrate down:    ```npm run db-down```,
- Prettify:           ```npm run prettify```,
- Start server:       ```npm run server```,
- build:              ```npm run build```,
- jasmine:            ```npm run jasmine```