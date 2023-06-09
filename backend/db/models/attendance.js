'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Attendance extends Model {

    static associate(models) {

      Attendance.belongsTo(models.User, {
        foreignKey: 'userId',
        // onDelete: 'CASCADE',
        // hooks: true
      })
      Attendance.belongsTo(models.Event, {
        foreignKey: 'eventId',
        // onDelete: 'CASCADE',
        // hooks: true
      })
    }
  }
  Attendance.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    eventId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Events'
      },
      // onDelete: 'CASCADE',
      // hooks: true
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users'
      },
      // onDelete: 'CASCADE',
      // hooks: true
    },
    status: {
      type: DataTypes.ENUM('attending','waitlist','pending'),
      allowNull: false,
      validate: {
        isIn: [['attending','waitlist','pending']]
      }
    },
  }, {
    sequelize,
    modelName: 'Attendance',
  });
  return Attendance;
};
