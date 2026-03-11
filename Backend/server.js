require("dotenv").config();

const app = require("./src/app");
const connectToDB = require("./src/config/database");
const { ENV } = require("./src/config/env");

let dbInitPromise;
async function ensureDb() {
  if (!dbInitPromise) dbInitPromise = connectToDB();
  return dbInitPromise;
}

// Local/dev: run a traditional server.
if (require.main === module) {
  ensureDb()
    .then(() => {
      app.listen(ENV.PORT, () => {
        console.log("Server started on port:", ENV.PORT);
      });
    })
    .catch((error) => {
      console.error("Error starting server:", error);
      process.exit(1);
    });
}

// Vercel (@vercel/node): export a handler.
module.exports = async (req, res) => {
  await ensureDb();
  return app(req, res);
};