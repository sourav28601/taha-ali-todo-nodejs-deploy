import { Router } from "express";
import { authenticateUser } from "../middlewares/authMiddleware.js";
import {
  createTask,
  getAllTask,
  getJobById,
  updateJobById,
  deleteJobById,
} from "../controllers/taskController.js";

const router = Router();

router.post("/", authenticateUser, createTask);
router.get("/", authenticateUser, getAllTask);
router.get("/:id", authenticateUser, getJobById);
router.patch("/:id", authenticateUser, updateJobById);
router.delete("/:id", authenticateUser, deleteJobById);

export default router;
