 import  {  Response, Request, NextFunction } from "express";
 import zxcvbn from "zxcvbn";
 
 function verifyPasswordStrength(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { password } = req.body;
  const outcome = zxcvbn(password);

  if (outcome.score < 3) {
    res.status(400).json({ message: "please user a stronger password!" });
    return
  }
  next();
}




export default verifyPasswordStrength;