import { NextFunction, Request, response, Response } from "express";
import { ApiError } from "../utils/ApiError";
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config()

export const validateEmail = async (req: Request, res: Response, next: NextFunction) => { 
    try {
      const { email } = req.body;
      if (!email) {
          throw new ApiError(401,'Email is required!')
      }
      const Response = await axios.get(
        `https://emailreputation.abstractapi.com/v1/?api_key=${process.env.ABSTRACT_API_KEY}&email=${email}`
    );
    const data = Response.data;
    // console.log("Email validation response:", data);
  
    if (data.email_deliverability.status !== "DELIVERABLE") {
      throw new ApiError(400, "Invalid email address");
    }
    next();
    } catch (error) {
      throw new ApiError(500, 'Internal server error', error);
    }
}