import { Request, Response, NextFunction } from "express";
import jwt, { VerifyErrors, JwtPayload } from "jsonwebtoken";
import { Userpayload } from "../src/types";

function verifyUser(req: Request, res: Response, next: NextFunction){
const { authToken } = req.cookies;
  

  if (!authToken) {
    res.status(401).json({ message: "Unauthorized.please login!" });

    return;
  }
  jwt.verify(
    authToken,
    process.env.JWT_SECRET!,
    (err: VerifyErrors | null, decoded: JwtPayload | string | undefined) => {
      if (err) {
        res.status(401).json({ message: "unauthorized." });
        return;
      }
      req.user = decoded as Userpayload;
      next();
      console.log('hit 1')
    }

  );
  

}






export default verifyUser;