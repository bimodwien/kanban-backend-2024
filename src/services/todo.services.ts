"use strict";

import prisma from "@/prisma";
import { Request } from "express";
import { Status } from "@prisma/client";

class TodoService {
  static async getAll() {
    const todos = await prisma.todo.findMany({
      include: {
        user: {
          select: {
            id: true,
            username: true,
            fullName: true,
          },
        },
      },
    });

    return todos;
  }

  static async getById(req: Request) {
    const { id } = req.params;
    const todo = await prisma.todo.findUnique({
      where: {
        id: String(id),
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            fullName: true,
          },
        },
      },
    });
    if (!todo) {
      throw new Error("Todo not found");
    }
    return todo;
  }

  static async getByUser(req: Request) {
    const userId = req.user?.id;

    if (!userId) {
      throw new Error("Unauthorized");
    }

    const todos = await prisma.todo.findMany({
      where: { userId },
    });

    if (!todos) {
      throw new Error("Todo not found on this user");
    }

    return todos;
  }

  static async create(req: Request) {
    const { title, content, order } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      throw new Error("Unauthorized");
    }

    const newTodo = await prisma.todo.create({
      data: {
        title,
        content,
        status: Status.todo,
        order: order || "low",
        userId,
      },
    });

    return newTodo;
  }

  static async edit(req: Request) {
    const { id } = req.params;
    const { title, content, order } = req.body;
    const userId = req.user?.id;

    const todo = await prisma.todo.findUnique({
      where: { id: String(id) },
    });

    if (!todo) {
      throw new Error("Todo not found");
    }

    if (todo.userId != userId) {
      {
        throw new Error("Unauthorized");
      }
    }

    const updatedTodo = await prisma.todo.update({
      where: { id: String(id) },
      data: {
        title,
        content,
        order,
      },
    });

    return updatedTodo;
  }

  static async updateStatus(req: Request) {
    const { id } = req.params;
    const { status } = req.body;
    const userId = req.user?.id;

    const todo = await prisma.todo.findUnique({
      where: { id: String(id) },
    });

    if (!todo) {
      throw new Error("Todo Not Found");
    }

    if (todo.userId != userId) {
      throw new Error("Unauthorized");
    }

    if (!Object.values(Status).includes(status)) {
      throw new Error("Invalid Status Value");
    }

    const updatedTodo = await prisma.todo.update({
      where: { id: String(id) },
      data: {
        status,
      },
    });

    return updatedTodo;
  }

  static async delete(req: Request) {
    const { id } = req.params;
    const userId = req.user?.id;

    const todo = await prisma.todo.findUnique({
      where: { id: String(id) },
    });

    if (!todo) {
      throw new Error("Todo Not Found");
    }

    if (todo.userId != userId) {
      throw new Error("Unauthorized");
    }

    const deleteTodo = await prisma.todo.delete({
      where: { id: String(id) },
    });
    return deleteTodo;
  }
}

export default TodoService;
