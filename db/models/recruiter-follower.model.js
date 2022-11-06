const { Model, DataTypes, Sequelize } = require('sequelize');
const { USER_TABLE } = require('./user.model');
const { RECRUITER_TABLE } = require('./recruiter.model');

const RECRUITER_FOLLOWER_TABLE = 'recruiter_followers';

const RecruiterFollowerSchema = {
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
  userId: {
    field: 'user_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: USER_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  }
};

class RecruiterFollower extends Model {
  static associate(models) {
    this.belongsTo(models.Recruiter, { as: 'recruiter' });
    this.belongsTo(models.User, { as: 'user' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: RECRUITER_FOLLOWER_TABLE,
      modelName: 'RecruiterFollower',
      timestamps: false
    }
  }
}

module.exports = { RecruiterFollower, RecruiterFollowerSchema, RECRUITER_FOLLOWER_TABLE };
