import express from "express";
import { authenticate } from "../middleware/authMiddleware";
import { sendFromContact, getUserMessages } from "../controllers/messageController";

const router = express.Router();

router.post("/contact", authenticate, sendFromContact);
router.get("/user", authenticate, getUserMessages);

export default router;
