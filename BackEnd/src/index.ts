// import { ConnectDB } from "./db/DbConnect";
// import app from "./app";
// import dotenv from "dotenv";

// dotenv.config();

// const PORT = process.env.PORT || 5000;

// ConnectDB()
//   .then(() => {
//       const server = app.listen(PORT, () => {
//         console.log(`Server is running on port ${PORT}`);
//       });
//       server.on("error", (error) => {
//         console.error("Server error:", error);
//       });
//   })
//   .catch((error) => {
//       console.error("Failed to connect to the database:", error);
//       process.exit(1);
//   });

import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import { ConnectDB } from "./db/DbConnect";

const PORT = process.env.PORT || 10000;

// Start server immediately
const server = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

// Connect DB AFTER server is up
ConnectDB()
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err);
    // DO NOT exit in production
  });

server.on("error", (error) => {
  console.error("Server error:", error);
});
