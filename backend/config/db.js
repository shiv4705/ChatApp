const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    // Success message in purple
    console.log(`\x1b[35mMongoDB connected: ${conn.connection.host}\x1b[0m`);
  } catch (error) {
    // Error message in purple
    console.error(`\x1b[35mError: ${error.message}\x1b[0m`);
    process.exit(1);
  }
};

module.exports = connectDB;
