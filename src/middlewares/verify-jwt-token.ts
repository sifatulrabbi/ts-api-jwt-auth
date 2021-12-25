import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import { configs } from "../configs";
import { IUser } from "../typings";

export function verifyJwtToken(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const bearer = req.headers.authorization;

  if (!bearer || !bearer.startsWith("Bearer ")) {
    res.status(403).json({ message: "Bearer token needed" });
    return;
  }

  try {
    const token = bearer.split("Bearer ")[1];
    const payload = jwt.verify(token, configs.JWT_SECRET);

    //@ts-ignore
    req.isAuthenticated = true;
    //@ts-ignore
    req.user = payload as IUser;

    next();
  } catch (err) {
    res.status(403).json({ error: "Login expired please login again" });
  }
}
