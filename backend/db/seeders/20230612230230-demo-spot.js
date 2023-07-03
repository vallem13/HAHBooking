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
        city: "Topanga",
        state: "CA",
        country: "United States",
        lat: 34.100570,
        lng: -118.611930,
        name: "ShangriLaLa Tiny House Mountaintop Getaway",
        description: "2 guests - 1 bed - 1 bath",
        price: 279,
      },
      {
        ownerId: 1,
        address: "123 Disney Lane",
        city: "Concord",
        state: "NC",
        country: "United States",
        lat: 35.408669,
        lng: -80.579178,
        name: "Stone and Timber Treehous",
        description: "2 guests - 1 bed - 1 bath",
        price: 173,
      },
      {
        ownerId: 1,
        address: "123 Disney Lane",
        city: "Chikamin Township",
        state: "MI",
        country: "United States",
        lat: 41.829620,
        lng: -86.660300,
        name: "A Frame Cabin",
        description: "6 guests - 3 bedrooms - 4 beds - 2 baths",
        price: 795,
      },
      {
        ownerId: 2,
        address: "123 Disney Lane",
        city: "Paridise Valley",
        state: "AZ",
        country: "United States",
        lat: 33.531060,
        lng: -111.943130,
        name: "Lux Resort Home",
        description: "12 guests - 6 bedrooms - 6 beds - 5 baths",
        price: 259,
      },
      {
        ownerId: 2,
        address: "123 Disney Lane",
        city: "Hot Springs",
        state: "AR",
        country: "United States",
        lat: 34.502781,
        lng: -93.055656,
        name: "Dock Holiday at Fox Pass Cabins",
        description: "4 guests - 1 bedroom - 2 beds - 1 bath",
        price: 215,
      },
      {
        ownerId: 2,
        address: "123 Disney Lane",
        city: "Tucson",
        state: "AR",
        country: "United States",
        lat: 34.502781,
        lng: -93.055656,
        name: "Gorgeous Getaway",
        description: "10 guests - 4 bedrooms - 4 beds - 2 baths",
        price: 288,
      },
      {
        ownerId: 3,
        address: "123 Disney Lane",
        city: "Broken Bow",
        state: "OK",
        country: "United States",
        lat: 34.502781,
        lng: -93.055656,
        name: "Unique Luxury Treehouse!",
        description: "12 guests - 3 bedrooms - 8 beds - 3.5 baths",
        price: 499,
      },
      {
        ownerId: 3,
        address: "123 Disney Lane",
        city: "Slade",
        state: "KY",
        country: "United States",
        lat: 34.502781,
        lng: -93.055656,
        name: "The Cliffs Cabin LUX",
        description: "6 guests - 2 bedrooms - 2 beds - 2 baths",
        price: 279,
      },
      {
        ownerId: 3,
        address: "123 Disney Lane",
        city: "Slade",
        state: "KY",
        country: "United States",
        lat: 34.502781,
        lng: -93.055656,
        name: "The Cliffs Cabin LUX",
        description: "6 guests - 2 bedrooms - 2 beds - 2 baths",
        price: 279,
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
