"use strict";

import TodoService from "@/services/todo.services";
import { Request, Response, NextFunction } from "express";

export class TodoController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await TodoService.getAll();
      res.status(200).send({
        message: "Get All Todos",
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await TodoService.getById(req);
      res.status(200).send({
        message: "Get Todo By Id",
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  async getByUser(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await TodoService.getByUser(req);
      res.status(200).send({
        message: "Get Todo By User",
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await TodoService.create(req);
      res.status(201).send({
        message: "Create Todo Success",
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  async edit(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await TodoService.edit(req);
      res.status(201).send({
        message: "Edit Todo Success",
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await TodoService.updateStatus(req);
      res.status(201).send({
        message: "Updated Todo Status Success",
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await TodoService.delete(req);
      res.status(201).send({
        message: "Delete Todo Success",
      });
    } catch (error) {
      next(error);
    }
  }
}
