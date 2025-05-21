import dotenv from "dotenv";

// Load environment variables
dotenv.config();

export const Config = {
    PORT: process.env.PORT || 3000,

    DB_HOST: process.env.DB_HOST || "localhost",
    DB_PORT: parseInt(process.env.DB_PORT || "3306"),
    DB_USERNAME: process.env.DB_USERNAME || "root",
    DB_PASSWORD: process.env.DB_PASSWORD || "password",
    DB_DATABASE: process.env.DB_DATABASE || "cinema_db",
    environment: process.env.NODE_ENV || "development",
};