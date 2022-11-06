const { Model, DataTypes, Sequelize } = require('sequelize');

const GROUP_TABLE = 'groups';

const GroupSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  description: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  createAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW
  }
};

class Group extends Model {
  static associate(models) {
    this.hasMany(models.Publication, {
      as: 'publications',
      foreignKey: 'groupId'
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: GROUP_TABLE,
      modelName: 'Group',
      timestamps: false
    }
  }
}

module.exports = { Group, GroupSchema, GROUP_TABLE };
