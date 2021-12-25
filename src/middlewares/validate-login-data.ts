import { Request, Response, NextFunction } from "express";

export function validateLoginData(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  if (!req.body.username || !req.body.password) {
    res.status(404).json({ error: "Username as password is required" });
    return;
  }

  next();
}
