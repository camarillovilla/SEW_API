const { Model, DataTypes, Sequelize } = require('sequelize');
const { CV_TABLE } = require('./cv.model');

const CV_WORK_EXPERIENCE_TABLE = 'cv_work_experiences';

const CVWorkExperienceSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  workExperience: {
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

class CVWorkExperience extends Model {
  static associate(models) {
    this.belongsTo(models.CV, { as: 'cv' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CV_WORK_EXPERIENCE_TABLE,
      modelName: 'CVWorkExperience',
      timestamps: false
    }
  }
}

module.exports = { CVWorkExperience, CVWorkExperienceSchema, CV_WORK_EXPERIENCE_TABLE };
