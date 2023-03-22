'use strict';
const {
  Model, Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    static associate(models) {
      Event.belongsTo(models.Group, {
        foreignKey: 'groupId',
        // onDelete: 'CASCADE',
        // hooks: true
      })
      Event.belongsTo(models.Venue, {
        foreignKey: 'venueId'
      })
      Event.hasMany(models.EventImage, {
        foreignKey: 'eventId'
      })
      Event.belongsToMany(models.User, {
        through: 'Attendance',
        foreignKey: 'eventId',
        otherKey: 'userId'
      })
      Event.hasMany(models.Attendance, {
        foreignKey: 'eventId'
      })
    }
  }
  Event.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    venueId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Venues'
      },
      onDelete: 'CASCADE',
      hooks: true
    },
    groupId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Groups'
      },
      onDelete: 'CASCADE',
      hooks: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        atLeast5(value){
          if (value.length < 5) {
            throw new Error('Name must be at least 5 characters')
          }
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM('Online', 'In person'),
      allowNull: false,
      validate: {
        isIn: [['Online', 'In person']]
      }
    },
    capacity: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: true,
        min: 1,
      }
    },
    price: {
      type: DataTypes.DECIMAL(4,2),
      validate: {
        min: 0,
      }
    },
    startDate: {
      type: DataTypes.DATE,
      validate: {
        isDate: true,
        inFuture(value){
          if (value <= new Date()){
            throw new Error('Start date must be in the future')
          }
        }
      }
    },
    endDate: {
      type: DataTypes.DATE,
      validate: {
        isDate: true,
        afterStartDate(value){
          if (value < this.startDate){
            throw new Error('End date is less than start date')
          }
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Event',
  });
  return Event;
};
