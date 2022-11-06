const { Model, DataTypes, Sequelize } = require('sequelize');
const { CV_TABLE } = require('./cv.model');

const CV_SKILL_TABLE = 'cv_skills';

const CVSkillSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  skill: {
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

class CVSkill extends Model {
  static associate(models) {
    this.belongsTo(models.CV, { as: 'cv'} );
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CV_SKILL_TABLE,
      modelName: 'CVSkill',
      timestamps: false
    }
  }
}

module.exports = { CVSkill, CVSkillSchema, CV_SKILL_TABLE };
