import express, { Express, Response, Request, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import zxcvbn from "zxcvbn";

const app: Express = express();
const client = new PrismaClient();

app.use(express.json());

app.get("/", (_rep, res) => {
  res.send("<h1>welcome to Tasky</h1>");
});

function verifyUserInformation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { firstName, lastName, userName, emailAddress, password } = req.body;

  if (!firstName) {
    res.status(400).json({ message: "Fisrtname is required" });
  }

  if (!lastName) {
    res.status(400).json({ message: "lastName is required" });
  }
  if (!userName) {
    res.status(400).json({ message: "userName is required" });
  }
  if (!emailAddress) {
    res.status(400).json({ message: "emailAddress is required" });
  }
  if (!password) {
    res.status(400).json({ message: "password is required" });
  }
  next();
}

function verifyPasswordStrength(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { password } = req.body;
  const outcome = zxcvbn(password);

  if (outcome.score < 3) {
    res.status(400).json({ message: "please user a stronger password!" });
  }
  next();
}

async function checkUserNameandEmailReuse(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { userName, emailAddress } = req.body;

  const userWithUserName = await client.user.findFirst({
    where: { userName },
  });

  if (!userWithUserName) {
    res.status(400).json({ message: "userName already used!" });
    return;
  }

  const userEmailAddress = await client.user.findFirst({
    where: { emailAddress },
  });

  if (!userEmailAddress) {
    res.status(400).json({ message: "emailAddress already used!" });
    return;
  }
  next();
}

app.post(
  "/auth/register",
  verifyUserInformation,
  checkUserNameandEmailReuse,
  verifyPasswordStrength,
  async (req, res) => {
    try {
      const { firstName, lastName, userName, emailAddress, password } =
        req.body;
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
  }
);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log("App is live on port ($4000)"));
