import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import pg from 'pg';

dotenv.config();

// export const sequelize = new Sequelize(
//   process.env.DB_NAME,
//   process.env.DB_USER,
//   process.env.DB_PASS,
//   {
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,
//     dialect: 'postgres'
//   }
// );

export const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: pg,
  protocol: 'postgres',
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
});
