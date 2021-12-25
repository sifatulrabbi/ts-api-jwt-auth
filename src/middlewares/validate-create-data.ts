import { Request, Response, NextFunction } from "express";

export function validateCreateData(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  if (!req.body.username || !req.body.password) {
    res.status(404).json({ error: "Username and password is required" });
    return;
  }

  next();
}
