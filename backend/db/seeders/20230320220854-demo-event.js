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
        hostId: 3,
        venueId: null,
        groupId: 3,
        name: 'Wear an impractical hat',
        description: 'if you are not inconvenienced by your hat, it is not impractical enough.',
        type: 'In person',
        capacity: 50,
        price: 25.69,
        startDate: new Date('2025-01-01 19:24:00'),
        endDate: new Date('2025-01-01 20:24:00'),
      },
      {
        hostId: 1,
        venueId: null,
        groupId: 1,
        name: 'Wear a silly hat',
        description: 'if you are not amused by your hat, it is not silly enough.',
        type: 'In person',
        capacity: 100,
        price: 5,
        startDate: new Date('2026-01-01 17:24:00'),
        endDate: new Date('2026-01-02 20:24:00'),
      },
      {
        hostId: 2,
        venueId: null,
        groupId: 2,
        name: 'Wear a haughty hat',
        description: 'if you are not feeling superior because of your hat, it is not haughty enough.',
        type: 'Online',
        capacity: 3,
        price: 250.99,
        startDate: new Date('2050-01-01 9:30:00'),
        endDate: new Date('2050-01-01 10:30:00'),
      },
      {
        hostId: 1,
        venueId: null,
        groupId: 1,
        name: 'Donating Silly Hats',
        description: 'We did not think it possible, but we bought too many silly hats! Argh!',
        type: 'In person',
        capacity: 100,
        price: 0,
        startDate: new Date('2020-03-01 12:24:00'),
        endDate: new Date('2020-03-01 13:24:00'),
      },
      {
        hostId: 1,
        venueId: null,
        groupId: 1,
        name: 'Shopping for Silly Hats',
        description: 'The crew is going to hit the outlets and find the silliest hats they have to offer',
        type: 'In person',
        capacity: 100,
        price: 0,
        startDate: new Date('2020-01-01 18:30:00'),
        endDate: new Date('2020-01-01 19:30:00'),
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
