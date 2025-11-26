import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

interface aiGenImageRes {
  data: {
    code: number;
    msg: string;
    data: {
      taskId: string;
      paramJson: string;
      completeTime: string;
      response: {
        originImageUrl: null;
        resultImageUrl: string;
      };
      successFlag: boolean;
      errorCode: null;
      errorMessage: null;
      operationType: string;
      createTime: string;
    };
  };
}

export async function fetchGeneratedImagesUrlMethod(
  taskIdValue: string
): Promise<aiGenImageRes> {
  const Fetch_Image_Data_Header = {
    Authorization: `Bearer ${process.env.NANO_BANANA_SECRET}`,
  };
  console.log("Fetching image with Task ID:", taskIdValue);
  const response:aiGenImageRes = await axios.get(
    `${process.env.NANO_BANANA_GEN_IMAGE_URL}${taskIdValue}`,
    { headers: Fetch_Image_Data_Header }
  );
  console.log("Fetched image data:", response.data);
  return response;
}