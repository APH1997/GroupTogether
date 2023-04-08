'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'GroupImages';
    await queryInterface.bulkInsert(options, [
      {
        groupId: 1,
        url: 'https://images.metroparent.com/wp-content/uploads/2020/12/FU-P-ClassicClown.jpg',
        preview: true,
      },
      {
        groupId: 2,
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUwyL2wRMF_ZMLz5WwHyr8SUWfBfzgqaTt7Z64E7x-CuKQud__54g5Rq44XH4RfV1YNKU&usqp=CAU',
        preview: true,
      },
      {
        groupId: 3,
        url: 'https://m.media-amazon.com/images/I/811AFmizQaL._AC_UL1500_.jpg',
        preview: true,
      }
    ], {})
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    options.tableName = 'GroupImages';
    await queryInterface.bulkDelete(options, {
      groupId: {[Op.in]: [1,2,3]}
    }, {})
  }
};
