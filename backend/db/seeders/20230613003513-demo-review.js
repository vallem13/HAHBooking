'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    await queryInterface.bulkInsert(options, [
      // {
      //   spotId: 1,
      //   userId: 5,
      //   review: 'Amazing spot! Perfect for 2!',
      //   stars: 5
      // },
      // {
      //   spotId: 1,
      //   userId: 4,
      //   review: 'Loved it! Nothing like a night in the woods. Very cozy!',
      //   stars: 4
      // },
      {
        spotId: 2,
        userId: 3,
        review: 'Enjoyed it.',
        stars: 3
      },
      {
        spotId: 2,
        userId: 2,
        review: 'Beautiful place! lots to do.',
        stars: 5
      },
      {
        spotId: 3,
        userId: 5,
        review: 'We had an amazing time.',
        stars: 4
      },
      {
        spotId: 3,
        userId: 4,
        review: 'Everything was great, just like the pictures.',
        stars: 5
      },
      {
        spotId: 4,
        userId: 5,
        review: 'The place was nice but the host was awful!',
        stars: 1
      },
      {
        spotId: 4,
        userId: 4,
        review: 'Nice spot with an amazing host!',
        stars: 5
      },
      {
        spotId: 5,
        userId: 3,
        review: 'Nice place!',
        stars: 4
      },
      {
        spotId: 5,
        userId: 1,
        review: 'Would totally reserve this spot again. Everything was great!',
        stars: 5
      },
      {
        spotId: 6,
        userId: 5,
        review: 'Nice place in a beautiful area!',
        stars: 4
      },
      {
        spotId: 6,
        userId: 4,
        review: 'The host was the worst! I complained but never responded.',
        stars: 2
      },
      {
        spotId: 7,
        userId: 5,
        review: 'Definitely coming back here!',
        stars: 5
      },
      {
        spotId: 7,
        userId: 4,
        review: 'Lovely stay! I recommend it!',
        stars: 4
      },
      {
        spotId: 8,
        userId: 2,
        review: 'You wont be dissappointed!',
        stars: 5
      },
      {
        spotId: 8,
        userId: 1,
        review: 'Five out of five! You wont regret it promise!',
        stars: 5
      },
      {
        spotId: 9,
        userId: 5,
        review: 'Not so sure... PLace is nice but there werre a few things that the host could have done bettter.',
        stars: 3
      },
      {
        spotId: 9,
        userId: 4,
        review: 'IN LOVE!',
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
