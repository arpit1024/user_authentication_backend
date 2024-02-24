import { Router } from "express";
import { connection } from "mongoose";
import { loginUser, registerUser } from "../controllers";

const router = Router();

router.get("/health-status", async (req, res) => {
    if (!connection || connection.readyState == 0 || connection.readyState == 3) return res.sendStatus(500);
    return res.sendStatus(200);
});

router.post("/login", loginUser);
router.post("/register", registerUser);

export default router;
