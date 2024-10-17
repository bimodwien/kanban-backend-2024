import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { TDecode } from "@/models/user";
import { SECRET_KEY } from "../config/index";

export const validateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "") || "";
    const decode = verify(token!, SECRET_KEY) as TDecode;
    if (decode.type != "access_token") throw new Error("Invalid Access Token");
    req.user = decode.user;
    next();
  } catch (error) {
    next(error);
  }
};

export const validateRefreshToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "") || "";
    const decode = verify(token!, SECRET_KEY) as TDecode;
    if (decode.type !== "refresh_token")
      throw new Error("Invalid Refresh Token");
    req.user = decode.user;
    next();
  } catch (error) {
    next(error);
  }
};
