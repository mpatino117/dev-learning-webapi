const knex = require("knex");

const {DB_USERNAME, DB_PASSWORD, DB_NAME, DB_HOST} = process.env

const database = knex({
client: "pg", // pg is the database library for postgreSQL on knexjs
connection: {
host: DB_HOST, // Your local host IP
user: DB_USERNAME, // Your postgres user name
password: DB_PASSWORD, // Your postgres user password
database: DB_NAME // Your database name
}
});

module.exports = database;
