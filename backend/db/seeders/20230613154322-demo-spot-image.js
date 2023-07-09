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
        url: 'https://tinyurl.com/mdkznu9u',
        preview: true
      },
      {
        spotId: 1,
        url: 'https://tinyurl.com/msyb2kw4',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://tinyurl.com/5k4ejj4y',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://tinyurl.com/5n723swb',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://tinyurl.com/bddvabhd',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://tinyurl.com/3sv78mds',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://tinyurl.com/yc3k64f8',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://tinyurl.com/592eu6e4',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://tinyurl.com/45myzcjp',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://tinyurl.com/42dv67yj',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://tinyurl.com/5n6tuzc9',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://tinyurl.com/53nrz6k4',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://tinyurl.com/4xf86t8c',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://tinyurl.com/3tbdjh4w',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://tinyurl.com/mrsrukpe',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://tinyurl.com/2s999y89',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://tinyurl.com/3ur6xc8v',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://tinyurl.com/mmdu66bn',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://tinyurl.com/2s4888a6',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://tinyurl.com/32r6ku3p',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://tinyurl.com/5fx6kt64',
        preview: true
      },
      {
        spotId: 5,
        url: 'https://tinyurl.com/275bwe34',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://tinyurl.com/ys7kfbdf',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://tinyurl.com/58fvdzwb',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://tinyurl.com/4d59medr',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://tinyurl.com/yvecrk22',
        preview: true
      },
      {
        spotId: 6,
        url: 'https://tinyurl.com/24pfm8h7',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://tinyurl.com/3jvfcspk',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://tinyurl.com/55425ws4',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://tinyurl.com/4kpp4fdk',
        preview: false
      },
      {
        spotId: 7,
        url: 'https://tinyurl.com/2ndxbpsh',
        preview: true
      },
      {
        spotId: 7,
        url: 'https://tinyurl.com/y265fe62',
        preview: false
      },
      {
        spotId: 7,
        url: 'https://tinyurl.com/34tjt4jv',
        preview: false
      },
      {
        spotId: 7,
        url: 'https://tinyurl.com/ewdcwa45',
        preview: false
      },
      {
        spotId: 7,
        url: 'https://tinyurl.com/534dw9vr',
        preview: false
      },
      {
        spotId: 8,
        url: 'https://tinyurl.com/mr2jhb7k',
        preview: true
      },
      {
        spotId: 8,
        url: 'https://tinyurl.com/57hakjnv',
        preview: false
      },
      {
        spotId: 8,
        url: 'https://tinyurl.com/2xaa9wjp',
        preview: false
      },
      {
        spotId: 8,
        url: 'https://tinyurl.com/bdhvnrmh',
        preview: false
      },
      {
        spotId: 8,
        url: 'https://tinyurl.com/dxxzr8me',
        preview: false
      },
      {
        spotId: 9,
        url: 'https://tinyurl.com/mryeht9w',
        preview: true
      },
      {
        spotId: 9,
        url: 'https://tinyurl.com/yckre4em',
        preview: false
      },
      {
        spotId: 9,
        url: 'https://tinyurl.com/2fffy5xp',
        preview: false
      },
      {
        spotId: 9,
        url: 'https://tinyurl.com/2a2stdmt',
        preview: false
      },
      {
        spotId: 9,
        url: 'https://tinyurl.com/2meb9z7e',
        preview: false
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
