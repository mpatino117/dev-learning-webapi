const { DB_NAME, DB_USERNAME, DB_PASSWORD } = process.env;
// database: DB_NAME,
// user: DB_USERNAME,
// password: DB_PASSWORD,

module.exports = {
  development: {
    client: "postgresql",
    connection: {
      database: DB_NAME,
      user: DB_USERNAME,
      password: DB_PASSWORD
    },
    migrations: {
      directory: __dirname + "/knex/migrations"
    },
    seeds: {
      directory: __dirname + "/knex/seeds"
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
      directory: __dirname + "/knex/migrations"
    },
    seeds: {
      directory: __dirname + "/knex/seeds"
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
      directory: __dirname + "/knex/migrations"
    },
    seeds: {
      directory: __dirname + "/knex/seeds"
    }
  }
};
