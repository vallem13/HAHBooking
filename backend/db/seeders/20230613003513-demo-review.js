'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    await queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        userId: 5,
        review: '',
        stars: 5
      },
      {
        spotId: 1,
        userId: 4,
        review: '',
        stars: 4
      },
      {
        spotId: 2,
        userId: 3,
        review: '',
        stars: 3
      },
      {
        spotId: 2,
        userId: 2,
        review: '',
        stars: 5
      },
      {
        spotId: 3,
        userId: 5,
        review: '',
        stars: 4
      },
      {
        spotId: 3,
        userId: 4,
        review: '',
        stars: 5
      },
      {
        spotId: 4,
        userId: 5,
        review: '',
        stars: 1
      },
      {
        spotId: 4,
        userId: 4,
        review: '',
        stars: 5
      },
      {
        spotId: 5,
        userId: 3,
        review: '',
        stars: 4
      },
      {
        spotId: 5,
        userId: 1,
        review: '',
        stars: 5
      },
      {
        spotId: 6,
        userId: 5,
        review: '',
        stars: 4
      },
      {
        spotId: 6,
        userId: 4,
        review: '',
        stars: 2
      },
      {
        spotId: 7,
        userId: 5,
        review: '',
        stars: 5
      },
      {
        spotId: 7,
        userId: 4,
        review: '',
        stars: 4
      },
      {
        spotId: 8,
        userId: 2,
        review: '',
        stars: 5
      },
      {
        spotId: 8,
        userId: 1,
        review: '',
        stars: 5
      },
      {
        spotId: 9,
        userId: 5,
        review: '',
        stars: 3
      },
      {
        spotId: 9,
        userId: 4,
        review: '',
        stars: 5
      }
    ], {})
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
