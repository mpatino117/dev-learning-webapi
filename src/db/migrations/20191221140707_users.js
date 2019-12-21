exports.up = function (knex) {
    return Promise.all([
      knex.schema.createTable('users', table => {
        table.increments('id').primary()
        table.string('email')
        table.string('username')
        table.string('password')
        table.string('role')
      })
    ])
  }
  
  exports.down = function (knex) {
    return Promise.all([
      knex.schema.dropTable('users')
    ])
  }