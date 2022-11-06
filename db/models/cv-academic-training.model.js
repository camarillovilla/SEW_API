const { Model, DataTypes, Sequelize } = require('sequelize');
const { CV_TABLE } = require('./cv.model');

const CV_ACADEMIC_TRAINING_TABLE = 'cv_academic_trainings';

const CVAcademicTrainingSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  academicTraining: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  createAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW
  },
  cvId:  {
    field: 'cv_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: CV_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  }
};

class CVAcademicTraining extends Model {
  static associate(models) {
    this.belongsTo(models.CV, { as: 'cv'} );
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CV_ACADEMIC_TRAINING_TABLE,
      modelName: 'CVAcademicTraining',
      timestamps: false
    }
  }
}

module.exports = { CVAcademicTraining, CVAcademicTrainingSchema, CV_ACADEMIC_TRAINING_TABLE };
