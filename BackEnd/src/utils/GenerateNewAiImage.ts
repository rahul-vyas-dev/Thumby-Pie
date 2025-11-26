import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

interface aiGenRes {
  data: {
    code: number;
    msg: string;
    data: {
      taskId: string;
    };
  };
}
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
export async function AiGeneratedImageTaskId({ modifiedPrompt, UserImage, image_size }: { modifiedPrompt: string; UserImage: string[]; image_size?: string; }): Promise<any> {
  const URL: string = process.env.NANO_BANANA_URL || "";
  const Header = {
    Authorization: `Bearer ${process.env.NANO_BANANA_SECRET}`,
    "Content-Type": "application/json",
  };
 
  const Body = {
    prompt: modifiedPrompt,
    type: "IMAGETOIAMGE",
    numImages: 2,
    callBackUrl: "https://your-callback-url.com/webhook",
    imageUrls: UserImage,
    watermark: "ThumbyPie",
    imageSize: image_size || "16:9",
  };

    const taskId: aiGenRes = await axios.post(URL, Body, { headers: Header });
    return taskId;
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