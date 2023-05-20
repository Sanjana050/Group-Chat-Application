const Sequelize=require('sequelize');
const sequelize=require('../util/database');

const AdminGroup = sequelize.define('admingroup', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  adminId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  adminName: {
    type: Sequelize.STRING,
    allowNull: false,
  }
});

module.exports = AdminGroup;
