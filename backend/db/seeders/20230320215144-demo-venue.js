'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Venues';
    await queryInterface.bulkInsert(options, [
      {
        groupId: 1,
        address: '1 One Street',
        city: 'One City',
        state: 'CT',
        lat: 0,
        lng: 0
      },
      {
        groupId: 2,
        address: '2 Two Street',
        city: 'Two City',
        state: 'CT',
        lat: 10,
        lng: 10
      },
      {
        groupId: 3,
        address: '3 Three Street',
        city: 'Three City',
        state: 'CT',
        lat: 20,
        lng: 20
      }
    ], {})
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    options.tableName = 'Venues';
    await queryInterface.bulkDelete(options, {
      groupId: {[Op.in]: [1,2,3]}
    }, {})
  }
};
