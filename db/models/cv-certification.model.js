const { Model, DataTypes, Sequelize } = require('sequelize');
const { CV_TABLE } = require('./cv.model');

const CV_CERTIFICATION_TABLE = 'cv_certifications';

const CVCertificationSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  certification: {
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

class CVCertification extends Model {
  static associate(models) {
    this.belongsTo(models.CV, { as: 'cv'} );
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CV_CERTIFICATION_TABLE,
      modelName: 'CVCertification',
      timestamps: false
    }
  }
}

module.exports = { CVCertification, CVCertificationSchema, CV_CERTIFICATION_TABLE };
