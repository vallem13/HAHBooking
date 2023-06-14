'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    await queryInterface.bulkInsert(options, [
      {
        ownerId: 1,
        address: "123 Disney Lane",
        city: "San Francisco",
        state: "California",
        country: "United States of America",
        lat: 37.7645358,
        lng: -122.4730327,
        name: "App Academy 1",
        description: "Place where web developers are created",
        price: 123,
      },
      {
        ownerId: 2,
        address: "123 Disney Lane",
        city: "New York",
        state: "New York",
        country: "United States of America",
        lat: 37.7645358,
        lng: -122.4730327,
        name: "App Academy 2",
        description: "Place where web developers are created",
        price: 123,
      },
      {
        ownerId: 3,
        address: "123 Disney Lane",
        city: "Miami",
        state: "Florida",
        country: "United States of America",
        lat: 37.7645358,
        lng: -122.4730327,
        name: "App Academy 3",
        description: "Place where web developers are created",
        price: 123,
      }
    ], {})
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      name: { [Op.in]: ['App Academy 1', 'App Academy 2', 'App Academy 3'] }
    }, {});
  }
};
