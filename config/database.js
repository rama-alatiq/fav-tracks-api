import { Sequelize } from "sequelize";
import trackModel from "../models/track.js";
import dotenv from "dotenv";

//loads .env file into process.env
dotenv.config(); 

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  logging: false, 
});

const Track = trackModel(sequelize);

const connectDb = async () => {
  try {
    await sequelize.authenticate();
    console.log("PostgreSQL connection has been established successfully.");

    // Sync all models + creates the table if it doesn't exist
    await sequelize.sync({ alter: true });
    console.log("All models were synchronized successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

export { sequelize, connectDb, Track };