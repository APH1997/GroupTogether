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
        url: 'www.picture1.com',
        preview: true,
      },
      {
        eventId: 2,
        url: 'www.picture2.com',
        preview: true,
      },
      {
        eventId: 3,
        url: 'www.picture3.com',
        preview: true,
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
