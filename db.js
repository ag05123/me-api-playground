// db.js
const { Sequelize } = require('sequelize');



const sequelize = new Sequelize(
  'railway',                // database name
  'root',                   // username
  'FQfjSrKtRhZPZkidgwMMMavAVObKPKGw', // password
  {
    host: 'mysql.railway.internal', // correct host
    port: 3306, // confirm this is the public port
    dialect: "mysql",
    dialectOptions: {
      connectTimeout: 10000 // 10 seconds
    },
    logging: false,
  }
);



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
