require("dotenv").config()
const app = require("./src/app")
const connectToDB = require("./src/config/database")
const { ENV } = require("./src/config/env")
// connectToDB()


// app.listen(3000, () => {
//     console.log("Server is running on port 3000")
// })
const startServer = async () => {
    try {
        await connectToDB();
        if (ENV.NODE_ENV !== "production") {
            app.listen(ENV.PORT, () => {
                console.log("Server started on port:", ENV.PORT);
            });
        }
    } catch (error) {
        console.error("Error starting server:", error);
        process.exit(1); // Exit the process with a failure code
    }
};

startServer();