import { NextFunction, Request, response, Response } from "express";
import { ApiError } from "../utils/ApiError";
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config()

export const validateEmail = async (req: Request, res: Response, next: NextFunction) => { 
    try {
      const email = req.body?.email;
      console.log("Validating email:", email,req.body);
      if (!email) {
          throw new ApiError(401, "Email is required!", "Email is required");
      }
      const Response = await axios.get(
        `https://emailreputation.abstractapi.com/v1/?api_key=${process.env.ABSTRACT_API_KEY}&email=${email}`
    );
    const data = Response.data;
    // console.log("Email validation response:", data);
  // console.log("Email deliverability status:", data.email_deliverability.status,'this is data',data);
    if (data.email_deliverability.status !== "deliverable") {
      throw new ApiError(400, "Invalid email address", "Invalid email address");
    }
    next();
    } catch (error) {
      console.log("Error validating email:", error);
      throw new ApiError(500, 'Internal server error!!!', error);
    }
}