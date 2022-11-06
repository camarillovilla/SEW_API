const { Model, DataTypes, Sequelize } = require('sequelize');
const { USER_TABLE } = require('./user.model');

const EMPLOYEE_TABLE = 'employees';

const EmployeeSchema = {
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

class Employee extends Model {
  static associate(models) {
    this.belongsTo(models.User, { as: 'user'});
    this.hasOne(models.CV, {
      as: 'cv',
      foreignKey: 'employeeId'
    })
    this.hasMany(models.EmployeeInterest, {
      as: 'interests',
      foreignKey: 'employeeId'
    });
    this.hasMany(models.EmployeeLaborField, {
      as: 'laborFields',
      foreignKey: 'employeeId'
    });
    this.belongsToMany(models.Offer, {
      as: 'offers',
      through: models.JobApplication,
      foreignKey: 'employeeId',
      otherKey: 'offerId'
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: EMPLOYEE_TABLE,
      modelName: 'Employee',
      timestamps: false
    }
  }
}

module.exports = { Employee, EmployeeSchema, EMPLOYEE_TABLE };
