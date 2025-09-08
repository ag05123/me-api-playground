// db.js
const { Sequelize } = require('sequelize');


const sequelize = new Sequelize('railway', 'root', 'FQfjSrKtRhZPZkidgwMMMavAVObKPKGw', {
  host: 'mysql://root:FQfjSrKtRhZPZkidgwMMMavAVObKPKGw@trolley.proxy.rlwy.net:18971/railway',
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
