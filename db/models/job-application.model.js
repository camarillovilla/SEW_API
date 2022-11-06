const { Model, DataTypes, Sequelize } = require('sequelize');
const { OFFER_TABLE } = require('./offer.model');
const { EMPLOYEE_TABLE } = require('./employee.model');

const JOB_APPLICATION_TABLE = 'job_applications';

const JobApplicationSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  status: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  createAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW
  },
  employeeId: {
    field: 'employee_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: EMPLOYEE_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  offerId: {
    field: 'offer_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: OFFER_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  }
};

class JobApplication extends Model {
  static associate() { }

  static config(sequelize) {
    return {
      sequelize,
      tableName: JOB_APPLICATION_TABLE,
      modelName: 'JobApplication',
      timestamps: false
    }
  }
}

module.exports = { JobApplication, JobApplicationSchema, JOB_APPLICATION_TABLE };
