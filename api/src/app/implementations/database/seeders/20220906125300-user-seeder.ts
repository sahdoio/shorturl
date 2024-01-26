'use strict';

const bcrypt = require('bcrypt')

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('users', [{
      email: 'admin@test.com',
      firstName: 'Joe',
      lastName: 'Black',
      phoneNumber: '5519996987012',
      password: await bcrypt.hashSync('123456', 10),
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users', null, {});
  }
};
