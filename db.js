// db.js
const { Sequelize } = require('sequelize');


const sequelize = new Sequelize('me_api_playground', 'root', 'FQfjSrKtRhZPZkidgwMMMavAVObKPKGw', {
  host: 'localhost',
  dialect: 'mysql'
});


async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

testConnection();

module.exports = sequelize;
