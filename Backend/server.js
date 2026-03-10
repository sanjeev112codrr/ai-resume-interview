require("dotenv").config();
const app = require("./src/app");
const connectToDB = require("./src/config/database");

let isDbConnected = false;
let dbConnectPromise = null;

async function ensureDbConnection() {
    if (isDbConnected) return;
    if (!dbConnectPromise) {
        dbConnectPromise = connectToDB().then(() => {
            isDbConnected = true;
        });
    }
    return dbConnectPromise;
}

/**
 * Vercel Serverless Function handler.
 * This is the entrypoint Vercel invokes for each request.
 */
module.exports = async (req, res) => {
    try {
        await ensureDbConnection();
        return app(req, res);
    } catch (error) {
        console.error("Unhandled error in serverless handler:", error);
        if (!res.headersSent) {
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
};