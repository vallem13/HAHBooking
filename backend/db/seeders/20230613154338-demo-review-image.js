'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'ReviewImages';
    await queryInterface.bulkInsert(options, [
      {
        reviewId: 1,
        url: 'https://uc.orez.io/f/77e05d59ef094dfba2a24ccbcdc680b9'
      },
      {
        reviewId: 2,
        url: 'https://getpaidforyourpad.com/wp-content/uploads/2017/03/Airbnb-review-with-feedback.png'
      },
      {
        reviewId: 3,
        url: 'https://elfsight.com/wp-content/uploads/2019/05/airbnb-reviews-hero-image-2.png'
      },
    ], {})
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'ReviewImages';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      reviewId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
