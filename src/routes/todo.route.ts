import { TodoController } from "@/controllers/todo.controller";
import { Router } from "express";
import { validateToken } from "@/middlewares/auth.middleware";

export class TodoRouter {
  private router: Router;
  private todoController: TodoController;

  constructor() {
    this.todoController = new TodoController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get("/", this.todoController.getAll);
    this.router.get("/user/:id", validateToken, this.todoController.getByUser);
    this.router.post("/", validateToken, this.todoController.create);
    this.router.patch(
      "/status/:id",
      validateToken,
      this.todoController.updateStatus
    );
    this.router.get("/:id", this.todoController.getById);
    this.router.put("/:id", validateToken, this.todoController.edit);
    this.router.delete("/:id", validateToken, this.todoController.delete);
  }

  getRouter(): Router {
    return this.router;
  }
}
