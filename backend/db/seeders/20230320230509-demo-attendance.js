'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}


module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'Attendances';
    await queryInterface.bulkInsert(options, [
      {
        userId: 1,
        eventId: 1,
        status: 'pending',
      },
      {
        userId: 1,
        eventId: 2,
        status: 'attending',
      },
      {
        userId: 1,
        eventId: 3,
        status: 'waitlist',
      },

      {
        userId: 2,
        eventId: 1,
        status: 'waitlist',
      },
      {
        userId: 2,
        eventId: 2,
        status: 'attending',
      },
      {
        userId: 2,
        eventId: 3,
        status: 'waitlist',
      },

      {
        userId: 3,
        eventId: 1,
        status: 'attending',
      },
      {
        userId: 3,
        eventId: 2,
        status: 'waitlist',
      },
      {
        userId: 3,
        eventId: 3,
        status: 'attending',
      },
      //chatGPT entries
      { userId: 4, eventId: 4, status: 'waitlist' },
      { userId: 4, eventId: 5, status: 'attending' },
      { userId: 4, eventId: 6, status: 'waitlist' },
      { userId: 5, eventId: 4, status: 'waitlist' },
      { userId: 5, eventId: 5, status: 'attending' },
      { userId: 5, eventId: 6, status: 'waitlist' },
      { userId: 6, eventId: 4, status: 'attending' },
      { userId: 6, eventId: 5, status: 'waitlist' },
      { userId: 6, eventId: 6, status: 'attending' },
      { userId: 7, eventId: 4, status: 'attending' },
      { userId: 4, eventId: 7, status: 'waitlist' },
      { userId: 4, eventId: 8, status: 'attending' },
      { userId: 4, eventId: 9, status: 'waitlist' },
      { userId: 5, eventId: 7, status: 'waitlist' },
      { userId: 5, eventId: 8, status: 'attending' },
      { userId: 5, eventId: 9, status: 'waitlist' },
      { userId: 6, eventId: 7, status: 'waitlist' },
      { userId: 6, eventId: 8, status: 'attending' },
      { userId: 6, eventId: 9, status: 'waitlist' },
      { userId: 7, eventId: 7, status: 'waitlist' },
      { userId: 7, eventId: 8, status: 'attending' },
      { userId: 7, eventId: 9, status: 'waitlist' },
      { userId: 8, eventId: 7, status: 'waitlist' },
      { userId: 8, eventId: 8, status: 'attending' },
      { userId: 8, eventId: 9, status: 'waitlist' },
      { userId: 9, eventId: 7, status: 'waitlist' },
      { userId: 9, eventId: 8, status: 'attending' },
      { userId: 9, eventId: 9, status: 'waitlist' },
      { userId: 10, eventId: 7, status: 'attending' },
      { userId: 10, eventId: 8, status: 'attending' },
      { userId: 11, eventId: 7, status: 'attending' },
      { userId: 11, eventId: 8, status: 'attending' },
      { userId: 11, eventId: 9, status: 'waitlist' },
      { userId: 12, eventId: 7, status: 'attending' },
      { userId: 12, eventId: 8, status: 'attending' },
      { userId: 12, eventId: 9, status: 'waitlist' },
      { userId: 13, eventId: 7, status: 'attending' },
      { userId: 13, eventId: 8, status: 'attending' },
      { userId: 13, eventId: 9, status: 'waitlist' },
      { userId: 14, eventId: 7, status: 'attending' },
      { userId: 14, eventId: 8, status: 'attending' },
      { userId: 14, eventId: 9, status: 'waitlist' },
      { userId: 15, eventId: 7, status: 'attending' },
      { userId: 15, eventId: 8, status: 'attending' },
      { userId: 15, eventId: 9, status: 'waitlist' },
      { userId: 16, eventId: 7, status: 'attending' },
      { userId: 16, eventId: 8, status: 'attending' },
      { userId: 16, eventId: 9, status: 'waitlist' },
      { userId: 17, eventId: 7, status: 'attending' },
      { userId: 17, eventId: 8, status: 'attending' },
      { userId: 17, eventId: 4, status: 'attending' },
      { userId: 18, eventId: 12, status: 'attending' },
      { userId: 18, eventId: 3, status: 'attending' },
      { userId: 18, eventId: 6, status: 'attending' },
      { userId: 19, eventId: 10, status: 'attending' },
      { userId: 19, eventId: 13, status: 'attending' },
      { userId: 19, eventId: 1, status: 'attending' },
      { userId: 20, eventId: 8, status: 'attending' },
      { userId: 20, eventId: 14, status: 'attending' },
      { userId: 20, eventId: 5, status: 'attending' },
      { userId: 21, eventId: 9, status: 'attending' },
      { userId: 21, eventId: 11, status: 'attending' },
      { userId: 21, eventId: 2, status: 'attending' },
      { userId: 22, eventId: 15, status: 'attending' },
      { userId: 22, eventId: 6, status: 'attending' },
      { userId: 22, eventId: 3, status: 'attending' },
      { userId: 23, eventId: 5, status: 'attending' },
      { userId: 23, eventId: 1, status: 'attending' },
      { userId: 23, eventId: 10, status: 'attending' },
      { userId: 24, eventId: 12, status: 'attending' }


    ], {})

  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Attendances';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      userId: { [Op.in]: [1, 2, 3] }
    }, {})
  }
};
