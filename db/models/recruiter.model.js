const { Model, DataTypes, Sequelize } = require('sequelize');
const { USER_TABLE } = require('./user.model');

const RECRUITER_TABLE = 'recruiters';

const RecruiterSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  fullName: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'full_name',
    unique: true,
  },
  phone: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  charge: {
    allowNull: true,
    type: DataTypes.STRING
  },
  createAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW
  },
  userId:  {
    field: 'user_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    unique: true,
    references: {
      model: USER_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  }
};

class Recruiter extends Model {
  static associate(models) {
    this.belongsTo(models.User, { as: 'user'} );
    this.hasMany(models.RecruiterFollower, {
      as: 'followers',
      foreignKey: 'recruiterId'
    });
    this.hasMany(models.Offer, {
      as: 'offers',
      foreignKey: 'recruiterId'
    });
    this.belongsToMany(models.Group, {
      as: 'groups',
      through: models.RecruiterGroup,
      foreignKey: 'recruiterId',
      otherKey: 'groupId'
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: RECRUITER_TABLE,
      modelName: 'Recruiter',
      timestamps: false
    }
  }
}

module.exports = { Recruiter, RecruiterSchema, RECRUITER_TABLE };
