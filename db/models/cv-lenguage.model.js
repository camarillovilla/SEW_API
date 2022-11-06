const { Model, DataTypes, Sequelize } = require('sequelize');
const { CV_TABLE } = require('./cv.model');

const CV_LENGUAGE_TABLE = 'cv_lenguages';

const CVLenguageSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  lenguage: {
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

class CVLenguage extends Model {
  static associate(models) {
    this.belongsTo(models.CV, { as: 'cv' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CV_LENGUAGE_TABLE,
      modelName: 'CVLenguage',
      timestamps: false
    }
  }
}

module.exports = { CVLenguage, CVLenguageSchema, CV_LENGUAGE_TABLE };
