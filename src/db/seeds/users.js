exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('users').insert([
        {
          id: 1,
          username: 'martin117',
          email: 'mpatino117@gmail.com',
          password: '$2b$10$r4QztoMgeWuc6kxL5bPJw.BW0uDCsp5COUXfoEX5Jy/E6uB7lSTUS',
        },
        {
          id: 2,
          username: 'Kent',
          email: 'kentrobinson85@gmail.com',
          password: '$2b$10$r4QztoMgeWuc6kxL5bPJw.BW0uDCsp5COUXfoEX5Jy/E6uB7lSTUS',
        },
        {
          id: 3,
          username: 'rowValue3',
          email: 'blovgren77@gmail.com',
          password: '$2b$10$r4QztoMgeWuc6kxL5bPJw.BW0uDCsp5COUXfoEX5Jy/E6uB7lSTUS',
        },
      ])
    })
}
