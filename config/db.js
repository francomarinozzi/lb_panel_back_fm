const { Sequelize } = require('sequelize');
require('dotenv').config({quiet:true});

const isProduction = process.env.NODE_ENV === 'production';

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectModule: pg,
  logging: false, // Ponelo en true si querés ver las queries en consola
  dialectOptions: isProduction
    ? {
        ssl: {
          require: true,
          rejectUnauthorized: false, 
        },
      }
    : {}, 
});

const connectDB = async () => {
  
  await sequelize.authenticate();
  
  await sequelize.sync({ alter: true }); 
};

module.exports = { sequelize, connectDB };