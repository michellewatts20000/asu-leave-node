const {
  Model,
  DataTypes,
  Sequelize
} = require('sequelize');
const sequelize = require('../config/connection');

class Entry extends Model {}

Entry.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  phone: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  post: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  sector: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  employer: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  union: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  shift: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  years: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  personal: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  annual: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  long: {
    type: DataTypes.DECIMAL(4, 2),
    allowNull: false,
  },

  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
  },
}, {
  sequelize,
  timestamps: false,
  freezeTableName: true,
  underscored: true,
  modelName: 'entry',
});

module.exports = Entry;