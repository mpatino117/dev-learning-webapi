'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [
        {email: "aphrodite@olympus.org", username: "aphrodite@olympus.org", password: "$2b$10$Ro3.Ghb2d6IMvDIYPYbaR.JNPUaDAK.w03TpHO4fy3GCOBVJWcBa.",  createdAt: new Date(), updatedAt: new Date() },
        {email: "athena@olympus.org", username: "athena@olympus.org", password: "$2b$10$Ro3.Ghb2d6IMvDIYPYbaR.JNPUaDAK.w03TpHO4fy3GCOBVJWcBa.", createdAt: new Date(), updatedAt: new Date() },
        {email: "zeus@olympus.org", username: "zeus@olympus.org", password: "$2b$10$Ro3.Ghb2d6IMvDIYPYbaR.JNPUaDAK.w03TpHO4fy3GCOBVJWcBa.", createdAt: new Date(), updatedAt: new Date() },
        {email: "apollo@olympus.org", username: "apollo@olympus.org", password: "$2b$10$Ro3.Ghb2d6IMvDIYPYbaR.JNPUaDAK.w03TpHO4fy3GCOBVJWcBa.", createdAt: new Date(), updatedAt: new Date() }
        ],{}
      );
  },
  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('Users');
  }
};