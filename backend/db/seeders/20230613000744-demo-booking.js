'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    await queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        userId: 1,
        startDate: new Date('2023-02-14'),
        endDate: new Date('2023-02-20')
      },
      {
        spotId: 2,
        userId: 2,
        startDate: new Date('2023-03-14'),
        endDate: new Date('2023-03-20')
      },
      {
        spotId: 3,
        userId: 3,
        startDate: new Date('2023-04-14'),
        endDate: new Date('2023-04-20')
      }
    ], {})
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
