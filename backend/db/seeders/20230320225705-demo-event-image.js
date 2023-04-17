'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'EventImages';
    await queryInterface.bulkInsert(options, [
      {
        eventId: 1,
        url: 'https://i.imgur.com/XKlm5OZ.jpg',
        preview: true,
      },
      {
        eventId: 2,
        url: 'https://i.imgur.com/GRisYUw.jpg',
        preview: true,
      },
      {
        eventId: 3,
        url: 'https://i.imgur.com/IxMu8iM.jpg',
        preview: true,
      },
      {
        eventId: 4,
        url: 'https://i.imgur.com/UFuo9bG.jpg',
        preview: true
      },
      {
        eventId: 5,
        url: "https://i.imgur.com/SsJpxQN.jpg",
        preview: true
      }
    ], {})
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    options.tableName = 'EventImages';
    await queryInterface.bulkDelete(options, {
      eventId: {[Op.in]: [1,2,3]}
    }, {})
  }
};
