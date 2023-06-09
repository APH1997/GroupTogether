'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Membership extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Membership.belongsTo(models.User, {
        foreignKey: 'userId',
        // onDelete: 'CASCADE',
        // hooks: true
      })
      Membership.belongsTo(models.Group, {
        foreignKey: 'groupId',
        // onDelete: 'CASCADE',
        // hooks: true
      })
    }
  }
  Membership.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users'
      },
      // onDelete: 'CASCADE',
      // hooks: true
    },
    groupId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Groups'
      },
      // onDelete: 'CASCADE',
      // hooks: true
    },
    status: {
      type: DataTypes.ENUM('organizer', 'co-host', 'member', 'pending'),
      validate: {
        isIn: [['organizer', 'co-host', 'member', 'pending']]
      }
    },
  }, {
    sequelize,
    modelName: 'Membership',
  });
  return Membership;
};
