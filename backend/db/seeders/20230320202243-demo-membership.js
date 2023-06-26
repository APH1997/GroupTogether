'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Memberships';
    await queryInterface.bulkInsert(options, [
      {
        userId: 1,
        groupId: 1,
        status: 'organizer',
      },
      {
        userId: 1,
        groupId: 2,
        status: 'co-host',
      },
      {
        userId: 1,
        groupId: 3,
        status: 'member',
      },

      {
        userId: 2,
        groupId: 1,
        status: 'member',
      },
      {
        userId: 2,
        groupId: 2,
        status: 'organizer',
      },
      {
        userId: 2,
        groupId: 3,
        status: 'co-host',
      },

      {
        userId: 3,
        groupId: 1,
        status: 'pending',
      },
      {
        userId: 3,
        groupId: 2,
        status: 'pending',
      },
      {
        userId: 3,
        groupId: 3,
        status: 'organizer',
      },
      // chatGPT organizer membership records
      {
        userId: 1,
        groupId: 1,
        status: 'organizer'
        },
        {
        userId: 2,
        groupId: 2,
        status: 'organizer'
        },
        {
        userId: 3,
        groupId: 3,
        status: 'organizer'
        },
        {
        userId: 8,
        groupId: 4,
        status: 'organizer'
        },
        {
        userId: 16,
        groupId: 5,
        status: 'organizer'
        },
        {
        userId: 3,
        groupId: 6,
        status: 'organizer'
        },
        {
        userId: 19,
        groupId: 7,
        status: 'organizer'
        },
        {
        userId: 12,
        groupId: 8,
        status: 'organizer'
        },
        {
        userId: 4,
        groupId: 9,
        status: 'organizer'
        },
        {
        userId: 21,
        groupId: 10,
        status: 'organizer'
        },
        {
        userId: 6,
        groupId: 11,
        status: 'organizer'
        },
        {
        userId: 14,
        groupId: 12,
        status: 'organizer'
        },
        {
        userId: 9,
        groupId: 13,
        status: 'organizer'
        }
    ], {})

  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Memberships';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      userId: {[Op.in]: [1, 2, 3]}
    }, {})
  }
};
