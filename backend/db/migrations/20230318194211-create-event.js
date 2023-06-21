'use strict';
/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Events', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      hostId:{
        type: Sequelize.INTEGER
      },
      lat: {
        type: Sequelize.DECIMAL(9,7),
      },
      lng: {
        type: Sequelize.DECIMAL(10,7),
      },
      groupId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Groups'
        },
        // onDelete: 'CASCADE',
        // hooks: true
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      description: {
        allowNull: false,
        type: Sequelize.STRING
      },
      type: {
        allowNull: false,
        type: Sequelize.ENUM('Online', 'In person'),
      },
      capacity: {
        type: Sequelize.INTEGER
      },
      price: {
        type: Sequelize.DECIMAL(5,2)
      },
      startDate: {
        allowNull: false,
        type: Sequelize.DATE
      },
      startTime:{
        allowNull: false,
        type: Sequelize.STRING
      },
      endDate: {
        allowNull: false,
        type: Sequelize.DATE
      },
      endTime:{
        allowNull: false,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    }, options);
  },
  async down(queryInterface, Sequelize) {
    options.tableName = 'Events';
    await queryInterface.dropTable(options);
  }
};
