'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [
        {email: "aphrodite@olympus.org", password: "Aphrodite",  createdAt: new Date(), updatedAt: new Date() },
        {email: "athena@olympus.org", password: "Athena", createdAt: new Date(), updatedAt: new Date() },
        {email: "zeus@olympus.org", password: "Zeus", createdAt: new Date(), updatedAt: new Date() },
        {email: "apollo@olympus.org", password: "Apollo", createdAt: new Date(), updatedAt: new Date() }
        ],{}
      );
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('Users');
  }
};