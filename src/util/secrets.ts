import logger from "./logger";
import dotenv from "dotenv";
import fs from "fs";

if (fs.existsSync(".env")) {
    logger.debug("Using .env file to supply config environment variables");
    dotenv.config({ path: ".env" });
} else {
    logger.debug("Using .env.example file to supply config environment variables");
    dotenv.config({ path: ".env.example" });  // you can delete this after you create your own .env file!
}
export const ENVIRONMENT = process.env.NODE_ENV;
const prod = ENVIRONMENT === "production"; // Anything else is treated as 'dev'

export const SESSION_SECRET = process.env["SESSION_SECRET"];
export const REDIS_URL = prod ? process.env["REDIS_URL"] : process.env["REDIS_URL_LOCAL"];
export const REDIS_PASSWORD = prod ? process.env["REDIS_PASSWORD"] : process.env["REDIS_PASSWORD_LOCAL"];
export const MYSQL_URL = prod ? process.env["MYSQL_URL"] : process.env["MYSQL_URL_LOCAL"];
export const MYSQL_USERNAME = prod ? process.env["MYSQL_USERNAME"] : process.env["MYSQL_USERNAME_LOCAL"];
export const MYSQL_PASSWORD = prod ? process.env["MYSQL_PASSWORD"] : process.env["MYSQL_PASSWORD_LOCAL"];
export const MYSQL_DATABASE = prod ? process.env["MYSQL_DATABASE"] : process.env["MYSQL_DATABASE_LOCAL"];

if (!SESSION_SECRET) {
    logger.error("No client secret. Set SESSION_SECRET environment variable.");
    process.exit(1);
}

if (!REDIS_URL) {
    if (prod) {
        logger.error("No redis connection string. Set REDIS_URL environment variable.");
    } else {
        logger.error("No redis connection string. Set REDIS_URL_LOCAL environment variable.");
    }
    process.exit(1);
}

if (!REDIS_PASSWORD) { 
    if (prod) {
        logger.error("No redis password string. Set REDIS_PASSWORD environment variable.");
    } else {
        logger.error("No redis password string. Set REDIS_PASSWORD_LOCAL environment variable.");
    }
    process.exit(1);
}

if (!MYSQL_URL) {
    if (prod) {
        logger.error("No mysql connection string. Set MYSQL_URL environment variable.");
    } else {
        logger.error("No mysql connection string. Set MYSQL_URL_LOCAL environment variable.");
    }
    process.exit(1);
}

if (!MYSQL_USERNAME) {
    if (prod) {
        logger.error("No mysql username string. Set MYSQL_USERNAME environment variable.");
    } else {
        logger.error("No mysql username string. Set MYSQL_USERNAME_LOCAL environment variable.");
    }
    process.exit(1);
}

if (!MYSQL_PASSWORD) {
    if (prod) {
        logger.error("No mysql password string. Set MYSQL_PASSWORD environment variable.");
    } else {
        logger.error("No mysql password string. Set MYSQL_PASSWORD_LOCAL environment variable.");
    }
    process.exit(1);
}

if (!MYSQL_DATABASE) {
    if (prod) {
        logger.error("No mysql database string. Set MYSQL_DATABASE environment variable.");
    } else {
        logger.error("No mysql database string. Set MYSQL_DATABASE_LOCAL environment variable.");
    }
    process.exit(1);
}
