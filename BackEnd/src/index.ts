import { ConnectDB } from "./db/DbConnect";
import app from "./app";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 5000;

ConnectDB()
  .then(() => {
      const server = app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
      });
      server.on("error", (error) => {
        console.error("Server error:", error);
      });
  })
  .catch((error) => {
      console.error("Failed to connect to the database:", error);
      process.exit(1);
  });