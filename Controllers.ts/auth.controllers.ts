import express, { Express } from "express";
import { Response, Request, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

const app: Express = express();
const client = new PrismaClient();

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, userName, emailAddress, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    await client.user.create({
      data: {
        firstName,
        lastName,
        userName,
        emailAddress,
        password: hashedPassword,
      },
    });
    res.status(201).json("user created successfully");
  } catch (error) {
    res.status(500).json("something went wrong");
    console.log(error);
  }
};



export const loginUser = async (req: Request, res: Response) => {
    
  try {
    const { identifier, password } = req.body;
    const user = await client.user.findFirst({
      where: {
        OR: [{ userName: identifier }, { emailAddress: identifier }],
      },
    });
    if (!user) {
      res.status(400).json({ message: "wrong login details" });
      return;
    }
    const passwardmatch = await bcrypt.compare(password, user.password);
    if (passwardmatch === false) {
      res.status(400).json({ message: "wrong login details" });
      return;
    }
const {password:userpassword,dateJoined,lastProfileUpdate, ... userDetails} = user;
 const token= jwt.sign(userDetails, process.env.JWT_SECRET!)
 console.log("token", token)
  res.cookie("authToken", token,{httpOnly:true,secure:true,sameSite:"none"}).json(userDetails)
  } 
  catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};