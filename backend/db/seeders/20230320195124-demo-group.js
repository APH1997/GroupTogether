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
        city: 'Springfield',
        state: 'PA'
      },
      {
        organizerId: 2,
        name: 'Haughty Hats Club',
        about: 'On every Tuesday that falls upon a full moon, we gather in congregation to don haughty hats, and, upon the clock striking midnight, we must doth our haughty hats.',
        type: 'In person',
        private: true,
        city: 'Greenwich',
        state: 'CT'
      },
      {
        organizerId: 3,
        name: 'Impractical Hats Club',
        about: 'On every Wednesday that falls upon a full moon, we gather in congregation to don impractical hats, and, upon the clock striking midnight, we must doth our impractical hats.',
        type: 'In person',
        private: false,
        city: 'New York City',
        state: 'NY'
      },
      //ChatGPT entries
      {
        organizerId: 8,
        name: 'Enthusiastic Hikers',
        about: 'Join our group for exciting hiking adventures in the beautiful wilderness. We explore various trails and enjoy breathtaking views. All skill levels are welcome!',
        type: 'In person',
        private: false,
        city: 'Denver',
        state: 'CO'
        },
        {
        organizerId: 16,
        name: 'Photography Lovers',
        about: 'A community for photography enthusiasts to share their passion, exchange tips and tricks, and showcase their work. Join us to explore the world through the lens!',
        type: 'In person',
        private: false,
        city: 'San Francisco',
        state: 'CA'
        },
        {
        organizerId: 3,
        name: 'Bookworms Club',
        about: 'Calling all book lovers! Dive into the captivating world of literature with us. We meet every month to discuss our latest reads and discover new literary gems.',
        type: 'In person',
        private: false,
        city: 'New York',
        state: 'NY'
        },
        {
        organizerId: 19,
        name: 'Fitness Fanatics',
        about: 'Get fit and have fun with our group of fitness enthusiasts. We organize various workout sessions, from high-intensity training to yoga and meditation.',
        type: 'In person',
        private: false,
        city: 'Los Angeles',
        state: 'CA'
        },
        {
        organizerId: 12,
        name: 'Tech Innovators',
        about: 'Explore the latest technologies and innovations with us. We hold regular meetups and workshops where we discuss cutting-edge tech trends and share ideas.',
        type: 'In person',
        private: false,
        city: 'Seattle',
        state: 'WA'
        },
        {
        organizerId: 4,
        name: 'Online Gamers',
        about: 'Join our online gaming community to connect with fellow gamers, participate in multiplayer battles, and discuss your favorite games. Game on!',
        type: 'Online',
        private: false,
        city: 'Virtual',
        state: 'CA'
        },
        {
        organizerId: 21,
        name: 'Art Enthusiasts',
        about: 'A group for art lovers to appreciate and create art together. We organize museum visits, art workshops, and exhibitions to celebrate creativity.',
        type: 'In person',
        private: false,
        city: 'Chicago',
        state: 'IL'
        },
        {
        organizerId: 6,
        name: 'Foodie Adventures',
        about: 'Embark on culinary journeys with us as we explore local restaurants, try diverse cuisines, and share our love for delicious food and great company.',
        type: 'In person',
        private: false,
        city: 'Austin',
        state: 'TX'
        },
        {
        organizerId: 14,
        name: 'Nature Photographers',
        about: 'Capture the beauty of nature through photography. Our group focuses on outdoor adventures, landscape photography, and wildlife encounters.',
        type: 'In person',
        private: false,
        city: 'Portland',
        state: 'OR'
        },
        {
        organizerId: 9,
        name: 'Language Exchange',
        about: 'Join us to practice and learn new languages in a friendly and supportive environment. We organize language exchange sessions and cultural events.',
        type: 'In person',
        private: false,
        city: 'Miami',
        state: 'FL'
        }

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
