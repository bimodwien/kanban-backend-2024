"use strict";

import UserService from "@/services/user.services";
import { Request, Response, NextFunction } from "express";

export class UserController {
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { user, access_token, refresh_token } = await UserService.login(
        req
      );
      res
        .status(200)
        .cookie("access_token", access_token, {
          httpOnly: true,
          sameSite: "none",
          secure: true,
        })
        .cookie("refresh_token", refresh_token, {
          httpOnly: true,
          sameSite: "none",
          secure: true,
        })
        .json({
          message: "login success",
          user,
        });
    } catch (error) {
      next(error);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      res
        .status(200)
        .clearCookie("access_token", {
          httpOnly: true,
          sameSite: "none",
          secure: true,
        })
        .clearCookie("refresh_token", {
          httpOnly: true,
          sameSite: "none",
          secure: true,
        })
        .json({ message: "logout success" });
    } catch (error) {
      next(error);
    }
  }

  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await UserService.register(req);
      res.status(200).send({
        message: "Register success",
      });
    } catch (error) {
      next(error);
    }
  }

  async keepLogin(req: Request, res: Response, next: NextFunction) {
    try {
      const { user } = await UserService.keepLogin(req);
      res.status(200).json({
        message: "keep login success",
        user,
      });
    } catch (error) {
      next(error);
    }
  }
}
