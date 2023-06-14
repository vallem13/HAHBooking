'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    await queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        url: 'https://media.architecturaldigest.com/photos/5a30296738bb817b7ffe1b4b/4:3/w_908,h_681,c_limit/Airbnb_Georgia3.jpg',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTau21tGb1nlbDCyQXRg5t4-GmsrGH-_j29BQ&usqp=CAU',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/home-improvement/wp-content/uploads/2022/07/download-23.jpg',
        preview: true
      }
    ], {})
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
