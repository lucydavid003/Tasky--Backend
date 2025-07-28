import { Router } from "express";
import { createTask, deleteTask, getAllTasks, getDeletedTasks,restoreTask,
     getTask,updateTask,getCompletedTasks } from "../Controllers.ts/task.controllers";
import verifyUser from "../Middlewares.ts/verifyUser";

const router: Router = Router();

router.post ("/" ,  verifyUser, createTask)
router.get ("/",   verifyUser,getAllTasks)
router.get("/deleted",verifyUser,getDeletedTasks)
router.get("/completed", verifyUser,getCompletedTasks )
router.get ("/:taskId",verifyUser,getTask)
router.patch("/:taskId",verifyUser,updateTask)
router.patch("/restore/:id", verifyUser, restoreTask)
router.delete("/:taskId", verifyUser,deleteTask )




export default router;