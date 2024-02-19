// import pg from "pg";
import "dotenv/config";

// Using an enviorment variable to get the db credentials
export const dbConnectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;
