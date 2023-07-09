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
        description: "The treehouse sits in a 400 yr old oak tree. 250 yr old beams support the structure floating 25ft in the air. Huge windows offering a view of the gardens. The privacy fence allows total seclusion. There is a composting toilet and vintage sink inside the treehouse.",
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
        description: "Welcome to our bright and spacious Diamond in the Bluff cabin! Where memories of your vacation will last forever. The breathtaking mountain views offer lush trees in the summer, the changing colors of fall, snowcapped peaks in the winter and the colorful blossoms of spring, definitely a sight to see.",
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
        description: "Get direct access to the slopes with this premium Mountain Village listing. Cut the first tracks across a fresh snowfall by skiing out directly from the villa’s deck to the Bridges run, which touches the property. The villa’s snow-capped tower will guide you home after a packed day, with a bubbling hot tub, Alpine-style interiors and warm, welcoming and plushy-outfitted living spaces awaiting you.",
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
        description: "Welcome to The Summit House, a completely renovated A-Frame cabin less than 1 mile to downtown Stowe. Wake up to views of the morning light casting through the forest from your glass wall bedroom. Relax after a day exploring the mountains in the huge spa style rainfall shower. Settle down after dinner around the modern wood burning fireplace while watching your favorite shows on the 50' TV. It's not just a rental, it's an experience. The latest addition to the OM Home Residences collection.",
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
        description: "The East Coast's #1 Mansion sleeps 32! With 14 bedrooms and 10 bathrooms, Hilltop Mansion in the Poconos provides both Family and Corporate Gatherings plenty of space for sleeping and entertaining! Corporate Groups, ask about special off-peak midweek promotional offers such extra sleeping space.",
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
        description: "Relax in this Light-Filled, Modern Home with walls of windows and backing to open space. 4000+ sqft w/ 3 living areas & 2 decks. Enjoy high-end mattresses, hot tub, sauna, heated garage & more! Fully equipped kitchen. Only 0.7 miles from Peak7 Base & mins to Main Street. Extra $50 per person/per night over 8 people. Pet allowed with prior approval. $250 fee per pet.",
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
        description: "Welcome to Chalet Vintersaga, just minutes from Mont Tremblant Ski Resort. Located in a private luxurious resort community, this modern Scandinavian home was built in 2021 and is surrounded by breathtaking nature. This stunning 2-level family friendly home is ideal for guests seeking tranquility near the heart of the action. It features a fully equipped gourmet kitchen, 4 bedrooms - each with an ensuite bathroom, a fireplace, a spa, 2 large patios with panoramic views, washer and dryer, and much more.",
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
        description: "Welcome to the grandeur of this exquisite ski-in ski-out mansion, nestled within a pristine gated community of Heber City, Utah. This opulent retreat offers ultimate luxury and style with no expense spared in creating an environment of unparalleled comfort and elegance. Experience the pinnacle of extravagant living in this ski-in ski-out mansion, and bask in the splendor of a magnificent mountain retreat.",
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
