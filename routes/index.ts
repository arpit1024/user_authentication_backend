import { Router } from "express";
import { connection } from "mongoose";
import { getUserPosts, getUserProfile, loginUser, registerUser, saveUserProfile } from "../controllers";
import { userAuthentication } from "../middlewares";

const router = Router();
const middlewares = [userAuthentication];

router.get("/health-status", async (req, res) => {
  if (!connection || connection.readyState == 0 || connection.readyState == 3)
    return res.sendStatus(500);
  return res.sendStatus(200);
});

router.post("/login", loginUser);
router.post("/register", registerUser);
router.get("/user-profile", middlewares, getUserProfile);
router.post('/save-user-profile', saveUserProfile);
router.get('/get-post', middlewares, getUserPosts);

export default router;
