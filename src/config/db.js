// db.js
import dotenv from "dotenv";
import { Sequelize } from 'sequelize'; // Import Sequelize class

dotenv.config(); // Load environment variables from .env file

// Create a new Sequelize instance for PostgreSQL
const sequelize = new Sequelize(
  process.env.DB_NAME,      // Database name (e.g., 'tena_mail_db')
  process.env.DB_USER,      // Database username (e.g., 'your_username')
  process.env.DB_PASSWORD,  // Database password
  {
    host: process.env.DB_HOST, // Database host (e.g., 'localhost' or an IP)
    dialect: 'postgres',       // Specify the database dialect
    logging: false,            // Optional: Set to true to see SQL queries in console
  }
);

const connectDB = async () => {
  try {
    // Test the connection
    await sequelize.authenticate();
    console.log("Connecté à PostgreSQL avec succès !");

  } catch (error) {
    console.error("Erreur lors de la connexion à PostgreSQL:", error);
    // Exit the process if connection fails
    process.exit(1);
  }
};
export { sequelize, connectDB }; // Export the sequelize instance if needed elsewhere
