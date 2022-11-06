const { Model, DataTypes, Sequelize } = require('sequelize');
const { EMPLOYEE_TABLE } = require('./employee.model');

const EMPLOYEE_INTEREST_TABLE = 'employee_interests';

const EmployeeInterestSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  interest: {
    allowNull: false,
    type: DataTypes.STRING
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
    onDelete: 'CASCADE'
  }
};

class EmployeeInterest extends Model {
  static associate(models) {
    this.belongsTo(models.Employee, { as: 'employee' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: EMPLOYEE_INTEREST_TABLE,
      modelName: 'EmployeeInterest',
      timestamps: false
    }
  }
}

module.exports = { EmployeeInterest, EmployeeInterestSchema, EMPLOYEE_INTEREST_TABLE };
