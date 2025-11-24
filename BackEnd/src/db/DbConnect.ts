import mongoose, { connection } from "mongoose";
import { DB_NAME } from "../const";
async function ConnectDB() {
  try {
    const response = mongoose.connect(`${process.env.DATABASEURL}/${DB_NAME}`);
    connection.on("error", (error) => {
      console.log(
        "Error while connecting to DB -> src > db > DbConnect.ts",
        error
      );
    });
    console.log("connected successfully");
  } catch (error) {
      console.log("Error while connecting to DB -> src > db > DbConnect.ts", error);
    process.exit(1);
  }
}
