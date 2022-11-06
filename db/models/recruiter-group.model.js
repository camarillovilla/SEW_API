const { Model, DataTypes, Sequelize } = require('sequelize');
const { GROUP_TABLE } = require('./group.model');
const { RECRUITER_TABLE } = require('./recruiter.model');

const RECRUITER_GROUP_TABLE = 'recruiter_groups';

const RecruiterGroupSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  createAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW
  },
  recruiterId: {
    field: 'recruiter_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: RECRUITER_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  groupId: {
    field: 'group_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: GROUP_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  }
};

class RecruiterGroup extends Model {
  static associate() { }

  static config(sequelize) {
    return {
      sequelize,
      tableName: RECRUITER_GROUP_TABLE,
      modelName: 'RecruiterGroup',
      timestamps: false
    }
  }
}

module.exports = { RecruiterGroup, RecruiterGroupSchema, RECRUITER_GROUP_TABLE };
