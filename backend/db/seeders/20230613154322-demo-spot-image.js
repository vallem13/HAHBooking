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
        url: 'https://afar.brightspotcdn.com/dims4/default/0bac719/2147483647/strip/true/crop/1500x750+0+125/resize/1440x720!/quality/90/?url=https%3A%2F%2Fafar-media-production-web.s3.amazonaws.com%2Fbrightspot%2Fd2%2F1d%2Faf582797f5374a5242348f4c2d96%2Foriginal-airbnb-20categories-20-20design-20-202.jpg',
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
