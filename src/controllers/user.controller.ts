"use strict";

import UserService from "@/services/user.services";
import { Request, Response, NextFunction } from "express";

export class UserController {
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { access_token, refresh_token } = await UserService.login(req);
      res
        .status(200)
        .cookie("access_token", access_token)
        .cookie("refresh_token", refresh_token)
        .json({
          message: "login success",
          access_token: access_token,
          refresh_token: refresh_token,
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
