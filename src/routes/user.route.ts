import { UserController } from "@/controllers/user.controller";
import { Router } from "express";
import { validateToken } from "@/middlewares/auth.middleware";

export class UserRouter {
  private router: Router;
  private userController: UserController;

  constructor() {
    this.userController = new UserController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post("/login", this.userController.login);
    this.router.post("/register", this.userController.register);
    this.router.get(
      "/keep-login",
      validateToken,
      this.userController.keepLogin
    );
    this.router.post("/logout", this.userController.logout);
  }

  getRouter(): Router {
    return this.router;
  }
}
