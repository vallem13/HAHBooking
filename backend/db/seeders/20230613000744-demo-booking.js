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
        userId: 2,
        startDate: new Date('2023-02-14'),
        endDate: new Date('2023-02-20')
      },
      {
        spotId: 1,
        userId: 3,
        startDate: new Date('2023-07-14'),
        endDate: new Date('2023-07-20')
      },
      {
        spotId: 2,
        userId: 2,
        startDate: new Date('2023-07-14'),
        endDate: new Date('2023-07-20')
      },
      {
        spotId: 2,
        userId: 3,
        startDate: new Date('2023-08-14'),
        endDate: new Date('2023-08-20')
      },
      {
        spotId: 3,
        userId: 2,
        startDate: new Date('2023-09-14'),
        endDate: new Date('2023-09-20')
      },
      {
        spotId: 3,
        userId: 3,
        startDate: new Date('2023-10-14'),
        endDate: new Date('2023-10-20')
      },
      {
        spotId: 4,
        userId: 1,
        startDate: new Date('2023-07-14'),
        endDate: new Date('2023-07-20')
      },
      {
        spotId: 4,
        userId: 3,
        startDate: new Date('2023-08-14'),
        endDate: new Date('2023-08-20')
      },
      {
        spotId: 5,
        userId: 3,
        startDate: new Date('2023-07-14'),
        endDate: new Date('2023-07-20')
      },
      {
        spotId: 5,
        userId: 1,
        startDate: new Date('2023-08-14'),
        endDate: new Date('2023-08-20')
      },
      {
        spotId: 6,
        userId: 3,
        startDate: new Date('2023-09-14'),
        endDate: new Date('2023-09-20')
      },
      {
        spotId: 6,
        userId: 1,
        startDate: new Date('2023-10-14'),
        endDate: new Date('2023-10-20')
      },
      {
        spotId: 7,
        userId: 2,
        startDate: new Date('2024-03-14'),
        endDate: new Date('2024-03-20')
      },
      {
        spotId: 7,
        userId: 1,
        startDate: new Date('2023-09-14'),
        endDate: new Date('2023-09-20')
      },
      {
        spotId: 8,
        userId: 2,
        startDate: new Date('2024-02-14'),
        endDate: new Date('2024-02-20')
      },
      {
        spotId: 8,
        userId: 1,
        startDate: new Date('2023-08-14'),
        endDate: new Date('2023-08-20')
      },
      {
        spotId: 9,
        userId: 2,
        startDate: new Date('2023-11-14'),
        endDate: new Date('2023-11-20')
      },
      {
        spotId: 9,
        userId: 1,
        startDate: new Date('2023-07-14'),
        endDate: new Date('2023-07-20')
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
