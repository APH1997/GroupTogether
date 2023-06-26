'use strict';
const bcrypt = require("bcryptjs");

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    return queryInterface.bulkInsert(options, [
      {
        email: 'user1@user.io',
        firstName: 'Yulian',
        lastName: 'Borwinkle',
        username: 'FakeUser1',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'user2@user.io',
        firstName: 'Billy Ray',
        lastName: 'Bolton',
        username: 'FakeUser2',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        email: 'user3@user.io',
        firstName: 'Thaddeus',
        lastName: 'Kabongo',
        username: 'FakeUser3',
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        email: 'demo@user.io',
        firstName: 'Demo',
        lastName: 'Lition',
        username: 'Demo',
        hashedPassword: bcrypt.hashSync('bababooiebanditblimpbobble')
      },
      // ChatGPT entries
      {
        email: 'user1@example.com',
        firstName: 'John',
        lastName: 'Doe',
        username: 'johndoe',
        hashedPassword: bcrypt.hashSync('password1')
        },
        {
        email: 'user2@example.com',
        firstName: 'Jane',
        lastName: 'Smith',
        username: 'janesmith',
        hashedPassword: bcrypt.hashSync('password2')
        },
        {
        email: 'user3@example.com',
        firstName: 'Michael',
        lastName: 'Johnson',
        username: 'michaelj',
        hashedPassword: bcrypt.hashSync('password3')
        },
        {
        email: 'user4@example.com',
        firstName: 'Emily',
        lastName: 'Brown',
        username: 'emilyb',
        hashedPassword: bcrypt.hashSync('password4')
        },
        {
        email: 'user5@example.com',
        firstName: 'David',
        lastName: 'Miller',
        username: 'davidm',
        hashedPassword: bcrypt.hashSync('password5')
        },
        {
        email: 'user6@example.com',
        firstName: 'Sophia',
        lastName: 'Wilson',
        username: 'sophiaw',
        hashedPassword: bcrypt.hashSync('password6')
        },
        {
        email: 'user7@example.com',
        firstName: 'James',
        lastName: 'Anderson',
        username: 'jamesa',
        hashedPassword: bcrypt.hashSync('password7')
        },
        {
        email: 'user8@example.com',
        firstName: 'Olivia',
        lastName: 'Taylor',
        username: 'oliviat',
        hashedPassword: bcrypt.hashSync('password8')
        },
        {
        email: 'user9@example.com',
        firstName: 'Daniel',
        lastName: 'Clark',
        username: 'danielc',
        hashedPassword: bcrypt.hashSync('password9')
        },
        {
        email: 'user10@example.com',
        firstName: 'Ava',
        lastName: 'Lee',
        username: 'avalee',
        hashedPassword: bcrypt.hashSync('password10')
        },
        {
        email: 'user11@example.com',
        firstName: 'William',
        lastName: 'Harris',
        username: 'williamh',
        hashedPassword: bcrypt.hashSync('password11')
        },
        {
        email: 'user12@example.com',
        firstName: 'Isabella',
        lastName: 'Walker',
        username: 'isabellaw',
        hashedPassword: bcrypt.hashSync('password12')
        },
        {
        email: 'user13@example.com',
        firstName: 'Liam',
        lastName: 'Turner',
        username: 'liamt',
        hashedPassword: bcrypt.hashSync('password13')
        },
        {
        email: 'user14@example.com',
        firstName: 'Mia',
        lastName: 'Hill',
        username: 'miah',
        hashedPassword: bcrypt.hashSync('password14')
        },
        {
        email: 'user15@example.com',
        firstName: 'Benjamin',
        lastName: 'Baker',
        username: 'benjaminb',
        hashedPassword: bcrypt.hashSync('password15')
        },
        {
        email: 'user16@example.com',
        firstName: 'Charlotte',
        lastName: 'King',
        username: 'charlottek',
        hashedPassword: bcrypt.hashSync('password16')
        },
        {
        email: 'user17@example.com',
        firstName: 'Mason',
        lastName: 'Green',
        username: 'masong',
        hashedPassword: bcrypt.hashSync('password17')
        },
        {
        email: 'user18@example.com',
        firstName: 'Amelia',
        lastName: 'Adams',
        username: 'ameliaa',
        hashedPassword: bcrypt.hashSync('password18')
        },
        {
        email: 'user19@example.com',
        firstName: 'Ethan',
        lastName: 'Campbell',
        username: 'ethanc',
        hashedPassword: bcrypt.hashSync('password19')
        },
        {
        email: 'user20@example.com',
        firstName: 'Harper',
        lastName: 'Wright',
        username: 'harperw',
        hashedPassword: bcrypt.hashSync('password20')
        }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['FakeUser3', 'FakeUser1', 'FakeUser2', 'Demo'] }
    }, {});
  }
};
