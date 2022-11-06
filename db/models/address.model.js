const { Model, DataTypes, Sequelize } = require('sequelize');
const { USER_TABLE } = require('./user.model');

const ADDRESS_TABLE = 'addresses';

const AddressSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  city: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  colony: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  insideNumber: {
    field: 'inside_number',
    allowNull: true,
    type: DataTypes.STRING,
  },
  outSideNumber: {
    field: 'outside_number',
    allowNull: false,
    type: DataTypes.STRING,
  },
  postalCode: {
    field: 'postal_code',
    allowNull: false,
    type: DataTypes.STRING,
  },
  streetName: {
    field: 'street_name',
    allowNull: false,
    type: DataTypes.STRING,
  },
  createAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW
  },
  userId: {
    field: 'user_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: USER_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  }
};

class Address extends Model {
  static associate(models) {
    this.belongsTo(models.User, { as: 'user' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ADDRESS_TABLE,
      modelName: 'Address',
      timestamps: false
    }
  }
}

module.exports = { Address, AddressSchema, ADDRESS_TABLE };
