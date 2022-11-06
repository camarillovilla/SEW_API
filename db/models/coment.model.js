const { Model, DataTypes, Sequelize } = require('sequelize');

const { PUBLICATION_TABLE } = require('./publication.model');

const COMENT_TABLE = 'coments';

const ComentSchema = {
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
  publicationId: {
    field: 'publication_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: PUBLICATION_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  }
};

class Coment extends Model {
  static associate(models) {
    this.belongsTo(models.Publication, { as: 'publication' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: COMENT_TABLE,
      modelName: 'Coment',
      timestamps: false
    }
  }
}

module.exports = { Coment, ComentSchema, COMENT_TABLE };
