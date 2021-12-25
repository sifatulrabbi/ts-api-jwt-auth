import { Router, Request, Response } from "express";
import { authService } from "./auth";
import { usersService } from "./users";
import {
  verifyJwtToken,
  validateCreateData,
  validateLoginData,
} from "./middlewares";

class Controller {
  private router: Router;

  constructor() {
    this.router = Router();

    this.router.get("/", this.getHello);
    this.router.get("/all", this.getAll);

    this.router.post("/login", validateLoginData, this.login);
    this.router.post("/logout", this.logout);

    this.router.get("/profile", verifyJwtToken, this.getProfile);
    this.router.post("/profile", validateCreateData, this.create);
    this.router.delete("/profile", this.create);
  }

  get routes(): Router {
    return this.router;
  }

  private getHello(req: Request, res: Response) {
    res.status(200).json({ message: "Hello world" });
  }

  private async getAll(req: Request, res: Response) {
    const users = await usersService.getAllUser();
    res.status(200).json(users);
  }

  private async login(req: Request, res: Response) {
    try {
      const token = authService.login(req.body.username, req.body.password);

      res.cookie("jwt", token).status(200).json({
        message: "Login successful",
      });
    } catch (err) {
      res.status(403).json({ message: String(err) });
    }
  }

  private async logout(req: Request, res: Response) {
    authService.logout();
  }

  private async getProfile(req: Request, res: Response) {
    const user = await usersService.getOneUser({});
    res.status(200).json({ user });
  }

  private async create(req: Request, res: Response) {
    const user = await usersService.create({
      username: req.body.username,
      password: req.body.password,
    });

    res.status(201).json(user);
  }

  private remove(req: Request, res: Response) {
    usersService.remove(req.params.id);
    res.status(200).json({ message: "User removed" });
  }
}

export const controller = new Controller();
