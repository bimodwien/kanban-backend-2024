"use strict";
import { Request } from "express";
import prisma from "@/prisma";
import { TUser, TDecode } from "@/models/user";
import { verify } from "jsonwebtoken";
import { SECRET_KEY } from "@/config/index";
import { hashPassword, comparePassword } from "@/libs/bcrypt";
import { createToken } from "../libs/jwt";
import { Prisma } from "@prisma/client";
import { AppError } from "@/appError";

class UserService {
  static async register(req: Request) {
    const { username, email, fullName, password } = req.body as TUser;

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ username }, { email }],
      },
    });
    if (existingUser) throw new Error("User sudah terdaftar");

    const hashed = await hashPassword(String(password));

    const data: Prisma.UserCreateInput = {
      username,
      email,
      fullName,
      password: hashed,
    };

    const newUser = await prisma.user.create({
      data,
    });

    return newUser;
  }

  static async login(req: Request) {
    const { username, password } = req.body as TUser;

    if (!password) throw new Error("password dibutuhkan");

    const user = (await prisma.user.findFirst({
      where: {
        username,
      },
      select: {
        id: true,
        username: true,
        fullName: true,
        email: true,
        password: true,
      },
    })) as TUser;

    if (!user) throw new AppError("User tidak ditemukan", 404);
    if (!user.password) throw new AppError("Password tidak ditemukan", 400);

    const checkPassword = await comparePassword(user.password, password);
    if (!checkPassword) throw new AppError("Wrong Password", 401);

    delete user.password;

    const access_token = createToken({ user, type: "access_token" }, "10hr");
    const refresh_token = createToken({ user, type: "refresh_token" }, "24hr");

    return { user, access_token, refresh_token };
  }

  static async keepLogin(req: Request) {
    const token = req.cookies.access_token;
    if (!token) {
      throw new Error("Access Token not found");
    }
    try {
      const decode = verify(token, SECRET_KEY) as TDecode;
      if (decode.type !== "access_token") {
        throw new Error("Invalid Access Token");
      }
      const userFromToken = decode.user;
      const user = await prisma.user.findUnique({
        where: {
          id: userFromToken.id,
        },
        select: {
          id: true,
          username: true,
          fullName: true,
          email: true,
        },
      });
      if (!user) throw new Error("User not found");
      return { user };
    } catch (error) {
      throw error;
    }
  }
}

export default UserService;
