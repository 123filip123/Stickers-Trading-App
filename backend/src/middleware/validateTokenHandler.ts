import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

export const validateToken = asyncHandler(async (req: any, res, next) => {
  let token;
  const authHeader =
    (req.headers.Authorization as string) || req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
    jwt.verify(token, accessTokenSecret!, (err: any, decoded: any) => {
      if (err) {
        res.status(401);
        throw new Error("User is not authorized");
      }
      req.user = decoded.user;
      next();
    });

    if (!token) {
      res.status(401);
      throw new Error("User is not authorized or token is missing");
    }
  }
});
