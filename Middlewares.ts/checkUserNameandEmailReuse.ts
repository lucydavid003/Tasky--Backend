import express, { Express, Response, Request, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();


  async function checkUserNameandEmailReuse(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { userName, emailAddress } = req.body;

  const userWithUserName = await client.user.findFirst({
    where: { userName },
  });

  if (userWithUserName) {
    res.status(400).json({ message: "userName already used!" });
    return;
  }

  const userEmailAddress = await client.user.findFirst({
    where: { emailAddress },
  });

  if (userEmailAddress) {
    res.status(400).json({ message: "emailAddress already used!" });
    return;
  }
  next();
}


export default checkUserNameandEmailReuse;