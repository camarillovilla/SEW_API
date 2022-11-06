const { Model, DataTypes, Sequelize } = require('sequelize');
const { RECRUITER_TABLE } = require('./recruiter.model');

const OFFER_TABLE = 'offers';

const OfferSchema = {
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
  description: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  title: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  category: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  score : {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  reportsNumber : {
    allowNull: false,
    field: 'reports_number',
    type: DataTypes.INTEGER,
  },
  experience : {
    allowNull: false,
    type: DataTypes.STRING
  },
  workday : {
    allowNull: false,
    type: DataTypes.STRING,
  },
  createAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW
  },
  recruiterId: {
    field: 'recruiter_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: RECRUITER_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
};

class Offer extends Model {
  static associate(models) {
    this.belongsTo(models.Recruiter, { as: 'recruiter' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: OFFER_TABLE,
      modelName: 'Offer',
      timestamps: false
    }
  }
}

module.exports = { Offer, OfferSchema, OFFER_TABLE };
