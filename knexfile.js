
require('dotenv').config()

const { DB_NAME, DB_USERNAME, DB_PASSWORD, DATABASE_URL } = process.env;


module.exports = {
  development: {
    client: "pg",
    connection: {
      database: DB_NAME,
      user: DB_USERNAME,
      password: DB_PASSWORD
    },
    migrations: {
      directory: __dirname + "src/db/migrations"
    },
    seeds: {
      directory: __dirname + "src/db/seeds"
    }
  },
  staging: {
    client: "postgresql",
    connection: {
      database: DB_NAME,
      user: DB_USERNAME,
      password: DB_PASSWORD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: __dirname + "src/db/migrations"
    },
    seeds: {
      directory: __dirname + "src/db/seeds"
    }
  },
  production: {
    client: "postgresql",
    connection: {
      database: DB_NAME,
      user: DB_USERNAME,
      password: DB_PASSWORD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: __dirname + "src/db/migrations"
    },
    seeds: {
      directory: __dirname + "src/db/seeds"
    }
  }
};
