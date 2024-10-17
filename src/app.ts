import express, {
  json,
  urlencoded,
  Express,
  Request,
  Response,
  NextFunction,
  Router,
} from "express";
import cors from "cors";
import { PORT } from "./config";
import { corsOption } from "./config/index";
import { UserRouter } from "./routes/user.route";
import { TodoRouter } from "./routes/todo.route";

export default class App {
  private app: Express;

  constructor() {
    this.app = express();
    this.configure();
    this.routes();
    this.handleError();
  }

  private configure(): void {
    this.app.use(cors(corsOption));
    this.app.use(json());
    this.app.use(urlencoded({ extended: true }));
  }

  private handleError(): void {
    // not found
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      if (req.path.includes("/api/")) {
        res.status(404).send("Not found !");
      } else {
        next();
      }
    });

    // error
    this.app.use(
      (err: any, req: Request, res: Response, next: NextFunction) => {
        if (req.path.includes("/api/")) {
          console.error("Error : ", err.stack);
          const statusCode = err.statusCode || 500;
          res
            .status(statusCode)
            .json({ error: err.message || "Internal Server Error" });
        } else {
          next();
        }
      }
    );
  }

  private routes(): void {
    const userRouter = new UserRouter();
    const todoRouter = new TodoRouter();

    this.app.get("/api", (req: Request, res: Response) => {
      res.send("Welcome to Kanban Backend!");
    });

    this.app.use("/api/users", userRouter.getRouter());
    this.app.use("/api/todos", todoRouter.getRouter());
  }

  public start(): void {
    this.app.listen(PORT, () => {
      console.log(`  ➜  [API] Local:   http://localhost:${PORT}/`);
    });
  }
}
