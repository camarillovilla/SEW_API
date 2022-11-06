const { Model, DataTypes, Sequelize } = require('sequelize');
const { EMPLOYEE_TABLE } = require('./employee.model');

const EMPLOYEE_LABOR_FIELD_TABLE = 'employee_labor_fields';

const EmployeeLaborFieldSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  laborField: {
    field:  'labor_field',
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

class EmployeeLaborField extends Model {
  static associate(models) {
    this.belongsTo(models.Employee, { as: 'employee' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: EMPLOYEE_LABOR_FIELD_TABLE,
      modelName: 'EmployeeLaborField',
      timestamps: false
    }
  }
}

module.exports = { EmployeeLaborField, EmployeeLaborFieldSchema, EMPLOYEE_LABOR_FIELD_TABLE };
