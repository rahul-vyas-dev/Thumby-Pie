import mongoose, { connection } from "mongoose";
import { DB_NAME } from "../const";
export async function ConnectDB() {
  try {
    const response =await mongoose.connect(`${process.env.MONGO_URL}/${DB_NAME}`);
    // console.log('first', response);
    response.connection.on("error", (error) => {
      console.log(
        "Error while connecting to DB -> src > db > DbConnect.ts on connection event",
        error
      );
    });
    console.log("connected successfully");
  } catch (error) {
      console.log("Error while connecting to DB -> src > db > DbConnect.ts", error);
    process.exit(1);
  }
}
