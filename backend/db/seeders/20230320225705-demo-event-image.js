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
        url: 'https://group-together-pics.s3.us-east-2.amazonaws.com/1.jpeg',
        preview: true,
      },
      {
        eventId: 2,
        url: 'https://group-together-pics.s3.us-east-2.amazonaws.com/2.jpeg',
        preview: true,
      },
      {
        eventId: 3,
        url: 'https://group-together-pics.s3.us-east-2.amazonaws.com/3.jpeg',
        preview: true,
      },
      {
        eventId: 4,
        url: 'https://group-together-pics.s3.us-east-2.amazonaws.com/4.jpeg',
        preview: true
      },
      {
        eventId: 5,
        url: "https://group-together-pics.s3.us-east-2.amazonaws.com/5.jpeg",
        preview: true
      },
      {
        eventId: 6,
        url: "https://group-together-pics.s3.us-east-2.amazonaws.com/6.jpeg",
        preview: true
      },
      {
        eventId: 7,
        url: "https://group-together-pics.s3.us-east-2.amazonaws.com/7.jpeg",
        preview: true
      },
      {
        eventId: 8,
        url: "https://group-together-pics.s3.us-east-2.amazonaws.com/8.jpeg",
        preview: true
      },
      {
        eventId: 9,
        url: "https://group-together-pics.s3.us-east-2.amazonaws.com/9.jpeg",
        preview: true
      },
      {
        eventId: 10,
        url: "https://group-together-pics.s3.us-east-2.amazonaws.com/10.png",
        preview: true
      },
      {
        eventId: 11,
        url: "https://group-together-pics.s3.us-east-2.amazonaws.com/11.jpeg",
        preview: true
      },
      {
        eventId: 12,
        url: "https://group-together-pics.s3.us-east-2.amazonaws.com/12.jpeg",
        preview: true
      },
      {
        eventId: 13,
        url: "https://group-together-pics.s3.us-east-2.amazonaws.com/13.jpeg",
        preview: true
      },
      {
        eventId: 14,
        url: "https://group-together-pics.s3.us-east-2.amazonaws.com/14.jpg",
        preview: true
      },
      {
        eventId: 15,
        url: "https://group-together-pics.s3.us-east-2.amazonaws.com/15.jpeg",
        preview: true
      },
      {
        eventId: 16,
        url: "https://group-together-pics.s3.us-east-2.amazonaws.com/16.jpeg",
        preview: true
      },
      {
        eventId: 17,
        url: "https://group-together-pics.s3.us-east-2.amazonaws.com/17.jpeg",
        preview: true
      },
      {
        eventId: 18,
        url: "https://group-together-pics.s3.us-east-2.amazonaws.com/18.webp",
        preview: true
      },
      {
        eventId: 19,
        url: "https://group-together-pics.s3.us-east-2.amazonaws.com/19.jpeg",
        preview: true
      },
      {
        eventId: 20,
        url: "https://group-together-pics.s3.us-east-2.amazonaws.com/20.jpeg",
        preview: true
      },
      {
        eventId: 21,
        url: "https://group-together-pics.s3.us-east-2.amazonaws.com/21.jpeg",
        preview: true
      },
      {
        eventId: 22,
        url: "https://group-together-pics.s3.us-east-2.amazonaws.com/22.webp",
        preview: true
      },
      {
        eventId: 23,
        url: "https://group-together-pics.s3.us-east-2.amazonaws.com/23.avif",
        preview: true
      },
    ], {})
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    options.tableName = 'EventImages';
    await queryInterface.bulkDelete(options, {
      eventId: {[Op.in]: [1,2,3,4,5]}
    }, {})
  }
};
