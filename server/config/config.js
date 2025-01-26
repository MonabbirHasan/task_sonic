const mysql = require("mysql2");
// DATABASE CONFIGURATION
const config = {
  host: "localhost",
  user: "root",
  password: "",
  database: "task_sonic",
  connectionLimit: 300,
  connectTimeout: 10000,
};

const pool = mysql.createPool(config);
// CREATE CONNECTION
pool.getConnection((err, connection) => {
  if (err) {
    console.error("Failed to connect to the database:", err.code);
    // ERROR CODE WISE MESSAGE
    switch (err.code) {
      case "ER_ACCESS_DENIED_ERROR":
        console.error("Invalid username or password. Check your credentials.");
        break;
      case "ENOTFOUND":
      case "EHOSTUNREACH":
      case "ETIMEDOUT":
        console.error(
          "Database host is unreachable. Verify the host address and network connectivity."
        );
        break;
      case "ER_BAD_DB_ERROR":
        console.error(
          "The specified database does not exist. Check the database name in your config."
        );
        break;
      default:
        console.error("An unknown error occurred:", err.message);
    }

    // EXIT THE PROCCESS IF FAILER
    process.exit(1);
  } else {
    console.log("Database connected successfully.");

    // RELEASE CONNECTION
    connection.release();
  }
});

module.exports = pool;
