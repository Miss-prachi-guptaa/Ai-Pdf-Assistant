import { Router } from "express";
import { speakHandler } from "../controller/speak.controller.js";

const router = Router();

router.route("/speak").post(speakHandler);

export const speakRouter = router;