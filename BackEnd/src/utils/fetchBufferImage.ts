import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
async function fetchImageBuffer(imageUrl:string): Promise<Buffer> {
  const response = await axios.get(imageUrl, {
    responseType: "arraybuffer",
    headers: {
      Authorization: `Bearer ${process.env.NANO_BANANA_SECRET}`,
    },
  });
  console.log("Fetched Image Buffer from URL:", response);
  return Buffer.from(response.data);
}
export default fetchImageBuffer;