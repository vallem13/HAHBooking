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
        url: 'https://shorturl.at/fiFS2',
        preview: true
      },
      {
        spotId: 1,
        url: 'https://shorturl.at/gtHTY',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://shorturl.at/cyRZ0',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://shorturl.at/jxE07',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://t.ly/WJij-',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://t.ly/28qcK',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://t.ly/SYxY',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://t.ly/lMFC',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://t.ly/neZ7',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://shorturl.at/pwAB3',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://t.ly/6uRj',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://t.ly/h3bzA',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://t.ly/zLqb',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://t.ly/MxCI',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://t.ly/iRMoC',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://t.ly/yEh8q',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://t.ly/Rf7L',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://t.ly/Wmzd',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://t.ly/ca7w',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://t.ly/Gl85',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://t.ly/HYjZ7',
        preview: true
      },
      {
        spotId: 5,
        url: 'https://t.ly/vwHL',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://t.ly/Bpf_h',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://t.ly/knDI',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://t.ly/UKMZX',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://t.ly/wS17',
        preview: true
      },
      {
        spotId: 6,
        url: 'https://t.ly/nUQFG',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://t.ly/MYIx',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://t.ly/pftL',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://t.ly/Q8Ja',
        preview: false
      },
      {
        spotId: 7,
        url: 'https://t.ly/J2pc',
        preview: true
      },
      {
        spotId: 7,
        url: 'https://t.ly/WeLx',
        preview: false
      },
      {
        spotId: 7,
        url: 'https://t.ly/z0LAk',
        preview: false
      },
      {
        spotId: 7,
        url: 'https://t.ly/XRus',
        preview: false
      },
      {
        spotId: 7,
        url: 'https://t.ly/t45L',
        preview: false
      },
      {
        spotId: 8,
        url: 'https://t.ly/fyKQj',
        preview: true
      },
      {
        spotId: 8,
        url: 'https://t.ly/SunDg',
        preview: false
      },
      {
        spotId: 8,
        url: 'https://t.ly/bfVu',
        preview: false
      },
      {
        spotId: 8,
        url: 'https://t.ly/eb1OO',
        preview: false
      },
      {
        spotId: 8,
        url: 'https://t.ly/khoz',
        preview: false
      },
      {
        spotId: 9,
        url: 'https://t.ly/Ndju',
        preview: true
      },
      {
        spotId: 9,
        url: 'https://t.ly/hbha',
        preview: false
      },
      {
        spotId: 9,
        url: 'https://t.ly/Oxqk',
        preview: false
      },
      {
        spotId: 9,
        url: 'https://t.ly/0Zu1',
        preview: false
      },
      {
        spotId: 9,
        url: 'https://t.ly/givET',
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
