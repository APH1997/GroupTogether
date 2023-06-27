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
        url: 'https://group-together-pics.s3.us-east-2.amazonaws.com/G1.jpeg',
        preview: true,
      },
      {
        groupId: 2,
        url: 'https://group-together-pics.s3.us-east-2.amazonaws.com/G2.jpeg',
        preview: true,
      },
      {
        groupId: 3,
        url: 'https://group-together-pics.s3.us-east-2.amazonaws.com/G3.jpg',
        preview: true,
      },
      {
        groupId: 4,
        url: 'https://group-together-pics.s3.us-east-2.amazonaws.com/G4.jpeg',
        preview: true,
      },
      {
        groupId: 5,
        url: 'https://group-together-pics.s3.us-east-2.amazonaws.com/G5.webp',
        preview: true,
      },
      {
        groupId: 6,
        url: 'https://group-together-pics.s3.us-east-2.amazonaws.com/G6.jpeg',
        preview: true,
      },
      {
        groupId: 7,
        url: 'https://group-together-pics.s3.us-east-2.amazonaws.com/G7.webp',
        preview: true,
      },
      {
        groupId: 8,
        url: 'https://group-together-pics.s3.us-east-2.amazonaws.com/G8.jpeg',
        preview: true,
      },
      {
        groupId: 9,
        url: 'https://group-together-pics.s3.us-east-2.amazonaws.com/G9.jpeg',
        preview: true,
      },
      {
        groupId: 10,
        url: 'https://group-together-pics.s3.us-east-2.amazonaws.com/G10.jpeg',
        preview: true,
      },
      {
        groupId: 11,
        url: 'https://group-together-pics.s3.us-east-2.amazonaws.com/G11.jpeg',
        preview: true,
      },
      {
        groupId: 12,
        url: 'https://group-together-pics.s3.us-east-2.amazonaws.com/G12.jpeg',
        preview: true,
      },
      {
        groupId: 13,
        url: 'https://group-together-pics.s3.us-east-2.amazonaws.com/G13.png',
        preview: true,
      },
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
