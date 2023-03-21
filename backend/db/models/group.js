'use strict';
const {
  Model, Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Group.belongsTo(models.User, {
        foreignKey: 'organizerId',
        as: 'Organizer'
      })
      Group.belongsToMany(models.User, {
        through: 'Membership',
        foreignKey: 'groupId',
        otherKey: 'userId'
      })
      Group.hasMany(models.GroupImage, {
        foreignKey: 'groupId'
      })
      Group.hasMany(models.Membership, {
        foreignKey: 'groupId'
      })
      Group.hasMany(models.Venue, {
        foreignKey: 'groupId',
        as: 'Venue'
      })
      Group.belongsToMany(models.Venue, {
        through: 'Event',
        foreignKey: 'groupId',
        otherKey: 'venueId'
      })
    }
  }
  Group.init({
    organizerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users'
      },
      onDelete: 'cascade',
      validate: {
        isNull: false
      }
    },
    name: {
      type: DataTypes.STRING(60),
      validate: {
        len: [0,60],
        isNull: false
      }
    },
    about: {
      type: DataTypes.STRING,
      validate: {
        isNull: false,
        atLeast50(value){
          if (value.length < 50){
            throw new Error('About must be 50 characters or more')
          }
        }
      }
    },
    type: {
      type: DataTypes.ENUM('Online', 'In person'),
      validate: {
        isIn: [['Online','In person']]
      }
    },
    private: {
      type: DataTypes.BOOLEAN,
      validate: {
        isNull: false,
      }
    },
    city: {
      type: DataTypes.STRING,
      validate: {
        isNull: false,
      }
    },
    state: {
      type: DataTypes.STRING,
      validate: {
        isNull: false,
      }
    },
    createdAt: {
      type: DataTypes.DATE,
      validate: {
        isNull: false,
      },
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedAt: {
      type: DataTypes.DATE,
      validate: {
        isNull: false,
      },
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
  }, {
    sequelize,
    modelName: 'Group',
  });
  return Group;
};
