import { Router } from "express";
import * as authController from "../controller/auth.controller.js";


const router = Router();

router.route("/register")
  .post(authController.postRegistrationPage);

router.route("/login")
  .post(authController.postLogin);

// router.post("/logout", logout);


export const authRouter = router;