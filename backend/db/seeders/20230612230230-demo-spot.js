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
        name: "The ATL Treehouse",
        description: "The treehouse sits in a 400 yr old oak tree. 250 yr old beams support the structure floating 25ft in the air.",
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
        name: "Amazing ViewsCabin",
        description: "Welcome to our bright and spacious Diamond in the Bluff cabin! Where memories of your vacation will last forever.",
        price: 471,
      },
      {
        ownerId: 1,
        address: "123 Disney Lane",
        city: "Chikamin Township",
        state: "MI",
        country: "United States",
        lat: 41.829620,
        lng: -86.660300,
        name: "Sky Haus - A-Frame Cabin",
        description: "Cozy A-frame cabin located about 15 minutes from the slopes and at the doorstep of some of the best hikes the PNW has to offer.",
        price: 357,
      },
      {
        ownerId: 2,
        address: "123 Disney Lane",
        city: "Paridise Valley",
        state: "AZ",
        country: "United States",
        lat: 33.531060,
        lng: -111.943130,
        name: "Alpen Ridge",
        description: "Get direct access to the slopes with this premium Mountain Village listing.",
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
        name: "The Summit House",
        description: "Welcome to The Summit House, a completely renovated A-Frame cabin less than 1 mile to downtown Stowe.",
        price: 525,
      },
      {
        ownerId: 2,
        address: "123 Disney Lane",
        city: "Tucson",
        state: "AR",
        country: "United States",
        lat: 34.502781,
        lng: -93.055656,
        name: "Hilltop Mansion Poconos",
        description: "The East Coast's #1 Mansion sleeps 32! With 14 bedrooms and 10 bathrooms, Hilltop Mansion in the Poconos provides both Family and Corporate Gatherings.",
        price: 3675,
      },
      {
        ownerId: 3,
        address: "123 Disney Lane",
        city: "Broken Bow",
        state: "OK",
        country: "United States",
        lat: 34.502781,
        lng: -93.055656,
        name: "Unique & Private on 2 acres",
        description: "Relax in this Light-Filled, Modern Home with walls of windows and backing to open space. 4000+ sqft w/ 3 living areas & 2 decks.",
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
        name: "Scandinavian Chalet + Spa ",
        description: "Welcome to Chalet Vintersaga, just minutes from Mont Tremblant Ski Resort.",
        price: 447,
      },
      {
        ownerId: 3,
        address: "123 Disney Lane",
        city: "Slade",
        state: "KY",
        country: "United States",
        lat: 34.502781,
        lng: -93.055656,
        name: "Deer Valley Mountain Villa",
        description: "Welcome to the grandeur of this exquisite ski-in ski-out mansion, nestled within a pristine gated community of Heber City, Utah. ",
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
