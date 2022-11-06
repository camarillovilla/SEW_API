const { Model, DataTypes, Sequelize } = require('sequelize');

const { GROUP_TABLE } = require('./group.model');

const PUBLICATION_TABLE = 'publications';

const PublicationSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  title: {
    allowNull: false,
    type: DataTypes.STRING,
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
  groupId: {
    field: 'group_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: GROUP_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  }
};

class Publication extends Model {
  static associate(models) {
    this.belongsTo(models.Group, { as: 'group' });
    this.hasMany(models.Coment, {
      as: 'coments',
      foreignKey: 'publicationId'
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PUBLICATION_TABLE,
      modelName: 'Publication',
      timestamps: false
    }
  }
}

module.exports = { Publication, PublicationSchema, PUBLICATION_TABLE };
