'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Events';
    await queryInterface.bulkInsert(options, [
      {
        venueId: 1,
        groupId: 3,
        name: 'Wear an impractical hat',
        description: 'if you are not inconvenienced by your hat, it is not impractical enough.',
        type: 'In person',
        capacity: 50,
        price: 25.69,
        startDate: '2025-01-01',
        endDate: '2025-02-01',
      },
      {
        venueId: 2,
        groupId: 1,
        name: 'Wear a silly hat',
        description: 'if you are not amused by your hat, it is not silly enough.',
        type: 'In person',
        capacity: 100,
        price: 0,
        startDate: '2026-01-01',
        endDate: '2026-02-01',
      },
      {
        venueId: 3,
        groupId: 2,
        name: 'Wear a haughty hat',
        description: 'if you are not feeling superior because of your hat, it is not haughty enough.',
        type: 'Online',
        capacity: 3,
        price: 250.99,
        startDate: '2050-01-01',
        endDate: '2050-02-01',
      }
    ], {})

  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    options.tableName = 'Events';
    await queryInterface.bulkDelete(options, {
      groupId: {[Op.in]: [1,2,3]}
    }, {})
  }
};
