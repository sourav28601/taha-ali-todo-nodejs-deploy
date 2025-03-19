import { Router } from "express";
import { authenticateUser } from "../middlewares/authMiddleware.js";
import { resetPassword } from "../controllers/userController.js";

const router = Router();

router.post("/reset-password", authenticateUser, resetPassword);

export default router;
