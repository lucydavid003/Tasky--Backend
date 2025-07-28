import { PrismaClient } from "@prisma/client";
import { Response, Request } from "express";

const client = new PrismaClient();

export const createTask = async (req: Request, res: Response) => {
  try {
    const { title, description ,deadlineDate,deadlineTime} = req.body;
    const { id } = req.user;
    await client.task.create({
      data: { description, title,deadlineDate,deadlineTime, userId: id },
    });

    res.status(201).json({ message: "New task created successfully" });
  } catch (error) {
    res.status(500).json({ message: "something went wrong!" });
    console.log(error)
  }
};

export const getAllTasks = async (req: Request, res: Response) => {
  try {
    const { id } = req.user;
    const tasks = await client.task.findMany({
      where: { userId: id,  isDeleted:false,isCompleted:false},

    });
    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({ message: "something went wrong!" });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const { taskId } = req.params;

    await client.task.update({
      where: { id: taskId },
      data: { isDeleted: true },
    });

    res.status(200).json({ message: "task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: " unable to delete task" });
  }
};


export const getDeletedTasks = async (req: Request, res: Response) => {
  try {
  
    const { id } = req.user;
    const deletedTasks = await client.task.findMany({
      where: {
        userId: id,
        isDeleted: true,
      },
    });
   

    res.status(200).json({ tasks: deletedTasks });
  } catch (error) {
    console.error("Error retrieving deleted tasks:", error);
    res.status(500).json({ message: "Unable to retrieve deleted tasks" });
  }  
}

export const updateTask = async (req: Request, res: Response) => {
  try {
    const { taskId } = req.params;
    const { title, description } = req.body;

    const updatedTask = await client.task.update({
      where: { id: taskId },
      data: {
        title: title && title,
        description: description && description
        
      },
    });

    res.status(200).json({ message: "Task updated successfully", task: updatedTask });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ message: "Unable to update task" });
  }
};


export const getTask = async (req: Request, res: Response) => {
  try {
    const { taskId } = req.params;
    const { id } = req.user;
    const task = await client.task.findFirst({
      where: {
        AND: [{ id: taskId }, { userId: id }, { isDeleted: false }]
      }
    });
    if (!task) {
      res.status(404).json({ message: "Task not found or deleted" });
      return;
    }
    res.status(200).json(task);
  } catch (e) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getCompletedTasks = async (req: Request, res: Response) => {
  try {
    const { id } = req.user;

    const tasks = await client.task.findMany({
      where: {
        userId: id,
        isCompleted: true,
        isDeleted: false,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong fetching completed tasks" });
  }
};

export const restoreTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const restoredTask = await client.task.update({
      where: { id },
      data: { isDeleted: false },
    });

    res.status(200).json({ message: "Task restored successfully", task: restoredTask });
  } catch (error) {
    console.error("Error restoring task:", error);
    res.status(500).json({ message: "Failed to restore task" });
  }
};

