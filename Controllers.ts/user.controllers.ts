import { Request, Response,  } from "express";

import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs";
const client = new PrismaClient();


export const updateUserInfo = async (req: Request, res: Response): Promise<void> => {
const userId = req.user?.id;
const { firstName, lastName, userName, emailAddress } = req.body;

  try {
    const updatedUser = await client.user.update({
      where: { id: userId },
      data: {
        firstName,
        lastName,
        userName,
        emailAddress,
      },
    });

    res.status(200).json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ message: "Failed to update user", error: err });
    console.log(err)
  }
};

export const updateUserPassword = async (req: Request, res: Response): Promise<void> => {
  const userId = req.user?.id;
  const { currentPassword, newPassword } = req.body;

  try {
    const user = await client.user.findUnique({ where: { id: userId } });

    if (!user || !user.password) {
        
     res.status(404).json({ message: "User not found" });
    return;
}
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
    res.status(400).json({ message: "Current password is incorrect" });
     return;
     }
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await client.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });

    res.json({ message: "Password updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to update password", error: err });
  }
};


export const getUserProfile = async (req: Request, res: Response): Promise<void> => {
  const userId = req.user?.id;

  try {
    const user = await client.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        userName: true,
        emailAddress: true,
      },
    });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.json(user);
  } catch (err) {
    console.error("Get profile error:", err);
    res.status(500).json({ message: "Failed to get profile", error: err });
  }
};
