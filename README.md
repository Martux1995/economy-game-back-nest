# Travelling Seller API
- <b>Codename</b>: economy-game-api
- <b>Status</b>: In early development

## Description
´Travelling Seller´ is a commerce game. Players need to buy/sell different goods from available cities, management resourses and .

This repo is a Backend implementation of this game, using Typescript and NestJS. 

This repo is a refactor from an old native javascript implementation. For this reason, development are in progress.

## Installation

First, you must have NodeJS and Docker to run this project. Then, install project dependencies.
```bash
$ npm i
```

Next, configure the environment vars in the .env file located in the project folder.

Then, execute the docker-compose script to up the database.
```bash
$ docker-compose up -d
```

Finally, run the game for the environment that you need:
```bash
# Development env
$ npm run start:dev

# Production env
$ npm run start:prod
```


## Test
From NestJS documentation:
```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

