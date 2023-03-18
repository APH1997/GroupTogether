'use strict';
const {
  Model, Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Event.hasMany(models.EventImage, {
        foreignKey: 'eventId'
      })
      Event.belongsToMany(models.User, {
        through: 'Attendance',
        foreignKey: 'eventId'
      })
    }
  }
  Event.init({
    venueId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Venues'
      }
    },
    groupId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Groups'
      }
    },
    name: {
      type: DataTypes.STRING,
      validate: {
        isNull: false,
        atLeast5(value){
          if (value.length < 5) {
            throw new Error('Name must be at least 5 characters')
          }
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      validate: {
        isNull: false,
      }
    },
    type: {
      type: DataTypes.ENUM('Online', 'In person'),
      validate: {
        isNull: false,
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
