import { Router } from "express";
import { getTimeNow } from "../controllers/time.controller";

const router = Router();
router.get("/", getTimeNow);

export default router;
