
const { DataTypes } = require('sequelize');
const sequelize = require('../db'); 

const Profile = sequelize.define('Profile', {
  
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true
  },
  education: {
    type: DataTypes.STRING,
    allowNull: true
  },
  skills: {
    type: DataTypes.JSON,
    allowNull: true
  },
  projects: {
    type: DataTypes.JSON,
    allowNull: true
  },
  links: {
    type: DataTypes.JSON,
    allowNull: true
  }
}, {
  
  tableName: 'profiles', 
  timestamps: false
});

module.exports = Profile;