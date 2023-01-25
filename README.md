# Udacity: Build A Storefront Backend

This is a backend API build in Nodejs, Postgres and express for an online store. It exposes a RESTful API to be used by the frontend developer. 

The database schema and and API routes information can be found in the [REQUIREMENT.md](REQUIREMENTS.md) 

## Installation Instructions
This section contains important packages used in this project and how to install them. To install all the dependencies, the following command shall be ran at the root directory to install all packages.

`yarn` or `npm install`

### Packages

The following packages were installed. 

####  express

`npm i express`

#### db-migrate

`npm i -g db-migrate`  and  `yarn add db-migrate db-migrate-pg`  

#### dotenv

`npm i -g dotenv`

#### postres

`npm i -g pg`

#### jsonwebtoken

`npm i -g jsonwebtoken`

#### bcrypt

`npm i -g bcrypt`

#### cors

`npm i -g cors`

#### cors

`npm i -g cross-env` needed to change the envirment variable for testing.


## Set up Database
### Create Databases

In this project a containerized Postgres database is used. To connect to the data base run the following 
command in the project root directory:

`docker-compose -f docker-compose.yml up`

**NB:**  A configuration script found under `database/docker-postgresql-multiple-databases` will automatically create 
the dev and test databases defined in `.env` file with : `POSTGRES_MULTIPLE_DATABASES=front_store_dev,front_store_test`

### Database migration
From the root directory and run the command below to migrate the database 

`yarn dev-up` or `npm run dev-up`

To reset the migration steps run the following command 

`yarn dev-down` or `npm run dev-down`


## Enviromental Variables Set up
In the following the environmental variables that needs to be set in a `.env` file are listed. 

**NB:** The given values are used only in developement and testing. 
```
POSTGRES_HOST=127.0.0.1
POSTGRES_MULTIPLE_DATABASES=front_store_dev,front_store_test
POSTGRES_DEV_DB=front_store_dev
POSTGRES_TEST_DB=front_store_test
POSTGRES_USER=mnm
POSTGRES_PASSWORD=**********
BCRYPT_PASSWORD=***********
TOKEN_SECRET=***********
SALT_ROUNDS=10
ENV=dev
TEST_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJmaXJzdG5hbWUiOiJ6YWluZWRpbiA3IiwibGFzdG5hbWUiOiJ6aWRhbmUgeml6b3UiLCJwYXNzd29yZF9kaWdlc3QiOiIkMmIkMTAkS0Q1eHR5QTd5V1hGLnFMeE1DSHBCT1MxZWlMWXBXalVlcGUzeVlNRC5PTkVMcTdwME5GVk8ifSwiaWF0IjoxNjc0NTI0MTU1fQ.9yVE7Xw-gGh5QptNzn_zZurWNjxddgAWZvyo93_9ry0
```


## Start App
`yarn watch` or `npm run watch`

!['server up '](docs/screenshots/server_up.png)

### Running Ports 
After start up, the server will start on port `3000` and the database on port `5432`

## Endpoint Access
All endpoints are described in the [REQUIREMENT.md](REQUIREMENTS.md) file. 

## Token and Authentication
Tokens are passed along with the http header as 
```
Authorization   Bearer <token>
```

## Testing
Run test with 

`yarn test`

It sets the environment variable `ENV` to `test`, migrates up tables for the test database, run the test then migrate down all the tables for the test database. 

!['test 1'](docs/screenshots/jasmine_test_output.png)

**NB:** If the rollback of the test database isn't executed at the end of the test, make sure to call `yarn test-down` to make sure it done.
 