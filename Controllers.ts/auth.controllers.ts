import express ,{Express} from "express";
import { PrismaClient } from "@prisma/client";

const app :Express  = express ();
const Client = new PrismaClient ();



