const dotenv = require("dotenv");
// Loads environment variables from .env file FIRST
dotenv.config();

const app = require("./app");
const connectDB = require("./config/db");

// Connects to MongoDB database
connectDB();

const PORT = process.env.PORT || 5000;

// Starts listening for requests
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
