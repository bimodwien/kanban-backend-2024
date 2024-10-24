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
}
