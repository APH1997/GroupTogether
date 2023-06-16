'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Groups';
    await queryInterface.bulkInsert(options, [
      {
        organizerId: 1,
        name: 'Silly Hats Club',
        about: 'On every Monday that falls upon a full moon, we gather in congregation to don silly hats, and, upon the clock striking midnight, we must doth our silly hats.',
        type: 'In person',
        private: false,
        city: 'Townsville',
        state: 'PA'
      },
      {
        organizerId: 2,
        name: 'Haughty Hats Club',
        about: 'On every Tuesday that falls upon a full moon, we gather in congregation to don haughty hats, and, upon the clock striking midnight, we must doth our haughty hats.',
        type: 'In person',
        private: true,
        city: 'Funky Town',
        state: 'CT'
      },
      {
        organizerId: 3,
        name: 'Impractical Hats Club',
        about: 'On every Wednesday that falls upon a full moon, we gather in congregation to don impractical hats, and, upon the clock striking midnight, we must doth our impractical hats.',
        type: 'In person',
        private: false,
        city: 'Shivermetimbersville',
        state: 'NY'
      },

    ], {})
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Groups';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      organizerId: {[Op.in]: [1, 2, 3]}
    }, {})
  }
};
