const { Model, DataTypes, Sequelize } = require('sequelize');
const { EMPLOYEE_TABLE } = require('./employee.model');

const CV_TABLE = 'cvs';

const CVSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
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

class CV extends Model {
  static associate(models) {
    this.belongsTo(models.Employee, { as: 'employee' });
    this.hasMany(models.CVLenguage, {
      as: 'lenguages',
      foreignKey: 'cvId'
    });
    this.hasMany(models.CVWorkExperience, {
      as: 'workExperiences',
      foreignKey: 'cvId'
    });
    this.hasMany(models.CVAcademicTraining, {
      as: 'academicTrainings',
      foreignKey: 'cvId'
    });
    this.hasMany(models.CVCertification, {
      as: 'certifications',
      foreignKey: 'cvId'
    });
    this.hasMany(models.CVSkill, {
      as: 'skills',
      foreignKey: 'cvId'
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CV_TABLE,
      modelName: 'CV',
      timestamps: false
    }
  }
}

module.exports = { CV, CVSchema, CV_TABLE };
