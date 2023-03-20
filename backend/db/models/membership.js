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
        onDelete: 'cascade',
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
      onDelete: 'cascade'
    },
    groupId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Groups'
      },
      onDelete: 'cascade'
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
