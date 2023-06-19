'use strict';
const {
  Model, Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
    static associate(models) {
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
        foreignKey: 'groupId',
        onDelete: 'CASCADE',
        hooks: true
      })
      Group.hasMany(models.Membership, {
        foreignKey: 'groupId',
        onDelete: 'CASCADE',
        hooks: true
      })
      Group.hasMany(models.Event, {
        foreignKey: 'groupId',
        onDelete: 'CASCADE',
        hooks: true
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
      onDelete: 'CASCADE',
      hooks: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(60),
      validate: {
        len: [0,60],
      },
      allowNull: false,
    },
    about: {
      type: DataTypes.STRING,
      validate: {
        len: [50, 300]
      },
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM('Online', 'In person'),
      validate: {
        isIn: [['Online','In person']]
      }
    },
    private: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date()
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date()
    },
  }, {
    sequelize,
    modelName: 'Group',
  });
  return Group;
};
