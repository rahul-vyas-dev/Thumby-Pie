import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import * as fs from "fs";
dotenv.config();


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const UploadFile = async (imagePath:string) => {
  // Use the uploaded file's name as the asset's public ID and
  // allow overwriting the asset with new versions
  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
  };

  try {
    // Upload the image
    const result = await cloudinary.uploader.upload(imagePath, options);
    console.log("File is succeccfully uploaded on cloudinary server ", result);
    return result;
  } catch (error) {
    console.error("src :: utils :: Cloudinary", error);
    fs.unlinkSync(imagePath);
    throw error;
  }
};

export const DeleteFile = async (publicId:string) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    console.error("src :: utils :: Cloudinary :: DeleteFile", error);
    throw error;
  }
};
