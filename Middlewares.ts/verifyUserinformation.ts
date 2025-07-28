import  {  Response, Request, NextFunction } from "express";



function verifyUserInformation(
  req: Request,
  res: Response,
  next: NextFunction
) {

  const { firstName, lastName, userName, emailAddress, password } = req.body;

  if (!firstName) {
    res.status(400).json({ message: "Firstname is required" });
    return
  }

  if (!lastName) {
    res.status(400).json({ message: "lastName is required" });
    return
  }
  if (!userName) {
    res.status(400).json({ message: "userName is required" });
    return
  }
  if (!emailAddress) {
    res.status(400).json({ message: "emailAddress is required" });
    return
  }
  if (!password) {
    res.status(400).json({ message: "password is required" });
    return
  }
  next();
}

 
export default verifyUserInformation
