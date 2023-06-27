'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'Memberships';
    await queryInterface.bulkInsert(options, [
      {
        userId: 1,
        groupId: 2,
        status: 'member',
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
        groupId: 3,
        status: 'member',
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
      },
      //chatGPT entries:
      {
        userId: 5,
        groupId: 6,
        status: 'member'
      },
      {
        userId: 5,
        groupId: 7,
        status: 'member'
      },
      {
        userId: 5,
        groupId: 8,
        status: 'member'
      },
      {
        userId: 5,
        groupId: 9,
        status: 'member'
      },
      {
        userId: 5,
        groupId: 10,
        status: 'member'
      },
      {
        userId: 7,
        groupId: 1,
        status: 'member'
      },
      {
        userId: 7,
        groupId: 2,
        status: 'member'
      },
      {
        userId: 7,
        groupId: 3,
        status: 'member'
      },
      {
        userId: 7,
        groupId: 4,
        status: 'member'
      },
      {
        userId: 7,
        groupId: 5,
        status: 'member'
      },
      {
        userId: 10,
        groupId: 6,
        status: 'member'
      },
      {
        userId: 10,
        groupId: 7,
        status: 'member'
      },
      {
        userId: 10,
        groupId: 8,
        status: 'member'
      },
      {
        userId: 10,
        groupId: 9,
        status: 'member'
      },
      {
        userId: 10,
        groupId: 10,
        status: 'member'
      },
      {
        userId: 11,
        groupId: 1,
        status: 'member'
      },
      {
        userId: 11,
        groupId: 2,
        status: 'member'
      },
      {
        userId: 11,
        groupId: 3,
        status: 'member'
      },
      {
        userId: 11,
        groupId: 4,
        status: 'member'
      },
      {
        userId: 11,
        groupId: 5,
        status: 'member'
      },
      {
        userId: 11,
        groupId: 6,
        status: 'member'
      },
      {
        userId: 13,
        groupId: 1,
        status: 'member'
      },
      {
        userId: 13,
        groupId: 2,
        status: 'member'
      },
      {
        userId: 13,
        groupId: 3,
        status: 'member'
      },
      {
        userId: 13,
        groupId: 4,
        status: 'member'
      },
      {
        userId: 13,
        groupId: 5,
        status: 'member'
      },
      {
        userId: 15,
        groupId: 6,
        status: 'member'
      },
      {
        userId: 15,
        groupId: 7,
        status: 'member'
      },
      {
        userId: 15,
        groupId: 8,
        status: 'member'
      },
      {
        userId: 15,
        groupId: 9,
        status: 'member'
      },
      {
        userId: 15,
        groupId: 10,
        status: 'member'
      },
      {
        userId: 17,
        groupId: 1,
        status: 'member'
      },
      {
        userId: 17,
        groupId: 2,
        status: 'member'
      },
      {
        userId: 17,
        groupId: 3,
        status: 'member'
      },
      {
        userId: 17,
        groupId: 4,
        status: 'member'
      },
      {
        userId: 17,
        groupId: 5,
        status: 'member'
      },
      {
        userId: 17,
        groupId: 6,
        status: 'member'
      },
      {
        userId: 18,
        groupId: 1,
        status: 'member'
      },
      {
        userId: 18,
        groupId: 2,
        status: 'member'
      },
      {
        userId: 18,
        groupId: 3,
        status: 'member'
      },
      {
        userId: 18,
        groupId: 4,
        status: 'member'
      },
      {
        userId: 18,
        groupId: 5,
        status: 'member'
      },
      {
        userId: 18,
        groupId: 6,
        status: 'member'
      },
      {
        userId: 18,
        groupId: 7,
        status: 'member'
      },
      {
        userId: 20,
        groupId: 1,
        status: 'member'
      },
      {
        userId: 20,
        groupId: 2,
        status: 'member'
      },
      {
        userId: 20,
        groupId: 3,
        status: 'member'
      },
      {
        userId: 20,
        groupId: 4,
        status: 'member'
      },
      {
        userId: 20,
        groupId: 5,
        status: 'member'
      },
      {
        userId: 20,
        groupId: 6,
        status: 'member'
      },
      {
        userId: 20,
        groupId: 7,
        status: 'member'
      },
      {
        userId: 20,
        groupId: 8,
        status: 'member'
      },
      {
        userId: 20,
        groupId: 9,
        status: 'member'
      },
      {
        userId: 20,
        groupId: 10,
        status: 'member'
      }
    ], {})

  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Memberships';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      userId: { [Op.in]: [1, 2, 3] }
    }, {})
  }
};
