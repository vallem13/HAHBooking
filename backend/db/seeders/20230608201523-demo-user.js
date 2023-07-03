'use strict';

const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    await queryInterface.bulkInsert(options, [
      {
        firstName: 'Demo',
        lastName: 'Lition',
        email: 'demo@user.io',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@user.io',
        username: 'John-Doe',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Jane',
        lastName: 'Carpenter',
        email: 'jane.carpenter@user.io',
        username: 'Jane-Carpenter',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Mario',
        lastName: 'Gonzales',
        email: 'mario.gonzales@user.io',
        username: 'Mario-Gonzales',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Carmen',
        lastName: 'Smith',
        email: 'carmen.smith@user.io',
        username: 'Carmen-Smith',
        hashedPassword: bcrypt.hashSync('password')
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
