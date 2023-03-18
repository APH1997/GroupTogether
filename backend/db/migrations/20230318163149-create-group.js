'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Groups', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      organizerId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users'
        },
        onDelete: 'cascade',
        validate: {
          isNull: false
        }
      },
      name: {
        type: Sequelize.STRING,
        validate: {
          len: [0,60],
          isNull: false
        }
      },
      about: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          atLeast50(value){
            if (value.length < 50){
              throw new Error('About must be 50 characters or more')
            }
          }
        }
      },
      type: {
        type: Sequelize.ENUM('Online', 'In person')
      },
      private: {
        type: Sequelize.BOOLEAN,
        validate: {
          isNull: false,
        }
      },
      city: {
        type: Sequelize.STRING,
        validate: {
          isNull: false,
        }
      },
      state: {
        type: Sequelize.STRING,
        validate: {
          isNull: false,
        }
      },
      createdAt: {
        type: Sequelize.DATE,
        validate: {
          isNull: false,
        },
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        type: Sequelize.DATE,
        validate: {
          isNull: false,
        },
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Groups');
  }
};
